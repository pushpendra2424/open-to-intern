

const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

//=====================================================Request body validation=================================================

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

//=====================================================Create college================================================

const createCollege = async function (req, res) {

    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters Please provide College details' })
            return
        }

        // Extract body
        const { name, fullName, logoLink } = requestBody; // Object destructing

        //Required field

        if (!isValid(name)) return res.status(400).send({ status: false, message: 'College name is required' })

        if (!isValid(fullName)) return res.status(400).send({ status: false, message: 'College fullname is required' })

        if (!isValid(logoLink)) return res.status(400).send({ status: false, message: 'logolink is required' })

        //==============================================LogoLink validation=================================================

        // const isValidUrl = function (v) { return /^(http(s)?:\/\/)?(www.)?([a-zA-Z0-9])+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?$/gm.test(v) }
        // //const isValidUrl = function (v) { return /^(http(s)?:\/\/)?(www.)?([a-zA-Z0-9])+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?$/gm.test(v) }

        // if (!isValidUrl(logoLink)) return res.status(400).send({ status: false, message: 'logolink is invalid' })

        //===============================================DB check for college name==========================================================================       

        const collegenameAlreadyUsed = await collegeModel.findOne({ name });
        if (collegenameAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${name} college name is already registered` })
        }

        //===================================================Create College in DB==================================================

        const newData = await collegeModel.create(requestBody);
        return res.status(201).send({ status: true, data: newData });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

//=====================================================Get college details================================================

const collegeDetails = async function (req, res) {
    try {
        const collegeName = req.query.collegeName
        if (!collegeName) return res.status(400).send({ status: false, message: 'College name is required to access data' })

        //==================================================DB check for college=======================================================

        const newCollege = await collegeModel.findOne({ name: collegeName, isDeleted: false });
        if (!newCollege) return res.status(404).send({ status: false, message: `College does not exit` });

        //===================================================DB check for Interns=======================================================

        const interns = await internModel.find({ collegeId: newCollege._id, isDeleted: false }, { name: 1, email: 1, mobile: 1 });
        if (!interns) return res.status(404).send({ status: false, message: `Interns does not exit` });

        //====================================Show perticular collge interns Detailes=================================================         

        res.status(200).send({status: true, data: { name: newCollege.name, fullName: newCollege.fullName, logoLink: newCollege.logoLink, interests: interns } })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails