




const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

//==========================================================================================================================================
//==========================================CollegeCreate==================================================================================
//==========================================================================================================================================

const createCollege = async function (req, res) {

    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide colleges details' })
            return
        }

        // Extract body
        const { name, fullName, logoLink } = requestBody; // Object destructing

        // Validation starts
        if (!isValid(name)) return res.status(400).send({ status: false, message: 'College name is required' })
        if (!isValid(fullName)) return res.status(400).send({ status: false, message: 'College fullname is required' })
        if (!isValid(logoLink)) return res.status(400).send({ status: false, message: 'logolink is required' })

        // Validation ends

        const allData = { name, fullName, logoLink }
        const newData = await collegeModel.create(allData);
        return res.status(201).send({ status: true, message: `created successfully`, data: newData });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }

}


//==========================================================================================================================================
//==========================================CollegeDetails==================================================================================
//==========================================================================================================================================
const collegeDetails = async function (req, res) {
    try {
        const collegeName = req.query.name
        if (!collegeName) return res.status(400).send({ status: false, message: 'College name is to access data' })
        res.status(400).send({ status: "false", msg: "College Name can't be empty" });
  
        //const college = await collegeModel.findOne({name:collegeName},{ isDeleted: 0, updatedAt: 0, createdAt: 0, __v: 0, });
        const college = await collegeModel.findOne({ name: collegeName }, { name: 1, fullName: 1, logoLink: 1 });
        console.log(college);
        if (!college) return res.status(404).send({ status: false, message: `College does not exit` });
        const interns = await internModel.find({ collegeId: college._id, isDeleted: false }, { __v: 0, isDeleted: 0, updatedAt: 0, createdAt: 0, collegeId: 0 });
        res.status(200).send({ data: { name: college.name, fullName: college.fullName, logoLink: college.logoLink, interns: interns } })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
  }
  module.exports.collegeDetails = collegeDetails

module.exports.createCollege = createCollege



