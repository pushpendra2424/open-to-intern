

const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")

const isValid = function(value) {
    if(typeof value === 'undefined'&& value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

const createIntern = async function(req,res){
    try {
        const requestBody = req.body;
        if(!isValidRequestBody(requestBody)) {
            res.status(400).send({status: false, message: 'Invalid request parameters. Please provide author details'})
            return
        }

        // Extract body
        const {name, email, mobile, collegeId} = requestBody; // Object destructing

        // Validation starts
        if(!isValid(name)) return res.status(400).send({status: false, message: 'Name is required'})
        if(!isValid(mobile)) return res.status(400).send({status: false, message: 'Mobile Number is required'})
        const isMobileAlreadyUsed = await internModel.findOne({mobile});
        if(isMobileAlreadyUsed) {
            res.status(400).send({status: false, message: `${mobile} Mobile is already registered`})
            return
        }

        if(!isValid(email)) return res.status(400).send({status: false, message: 'Email is required'})

        if(!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({status: false, message: `Email should be a valid email address`})
            return
        }
        const isEmailAlreadyUsed = await internModel.findOne({email}); // {email: email} object shorthand property
        if(isEmailAlreadyUsed) {
            return res.status(400).send({status: false, message: `${email} email address is already registered`})
            
        }
        if(!isValid(collegeId)) return res.status(400).send({status: false, message: 'College ID is required'})
        const iscollegeId = await collegeModel.findById(collegeId)
        if(!iscollegeId) return res.status(400).send({status: false, message:  'College ID not Exist'})

        // Validation ends

        const allData = {name, email, mobile, collegeId}
        const newData = await internModel.create(allData);
        return res.status(201).send({status: true, message: `created successfully`, data: newData});
    } catch (error) {
        res.status(500).send({status: false, message: error.message});
    }

}


module.exports.createIntern = createIntern