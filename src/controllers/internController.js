

const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")

//=====================================================Request body validation=================================================

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

//==================================================Create student for internship======================================================

const createIntern = async function (req, res) {
    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide internship details' })
        }

        // Extract body
        const { name, email, mobile, collegeId } = requestBody; // Object destructing

        // Validation starts

        if (!isValid(name)) return res.status(400).send({ status: false, message: 'Name is required' })

        if (!isValid(email)) return res.status(400).send({ status: false, message: 'Email is required' })

        //=================================================Email validation========================================================

        const validateEmail = function (v) { return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(v) }

        if (!validateEmail(email)) return res.status(400).send({ status: false, msg: "Email is invalid" })

        //=========================================================================================================================

        if (!isValid(mobile)) return res.status(400).send({ status: false, message: 'Mobile Number is required' })

        //=================================================Mobile validation========================================================

        const isValidMobile = function (v) { return /^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/.test(v) }

        if (!isValidMobile(mobile)) return res.status(400).send({ status: false, message: 'Mobile number is invalid,please enter 10 digit mobile number' })

        //=========================================================================================================================

        if (!isValid(collegeId)) return res.status(400).send({ status: false, message: 'College ID is required' })

        //=============================================DB check for emailId=====================================================      

        const isEmailAlreadyUsed = await internModel.findOne({ email: email }); // {email: email} object shorthand property
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} Email address is already registered` })
        }
        //===============================================DB check for mobileNumber==========================================================================       

        const isMobileAlreadyUsed = await internModel.findOne({ mobile });
        if (isMobileAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${mobile} Mobile number  is already registered` })
        }

        //=================================================DB check for collegeId ===============================================     

        const iscollegeId = await collegeModel.findById(collegeId)
        if (!iscollegeId) return res.status(400).send({ status: false, message: 'College ID does not Exist' })

        const allData = { name, email, mobile, collegeId }

        //=================================================Create Intern in DB===============================================     

        const newData = await internModel.create(allData);
        return res.status(201).send({ status: true, message: `Created successfully`, data: newData });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }

}

module.exports.createIntern = createIntern