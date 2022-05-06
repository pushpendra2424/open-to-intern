const express = require('express');
const router = express.Router();

const collegeController = require('../controllers/collegeController');
const internController = require('../controllers/internController')

//=========================college routes==========================

router.post('/functionup/colleges', collegeController.createCollege);

router.get('/functionup/collegeDetails', collegeController.collegeDetails);

//=======================Intern routes==========================

router.post('/functionup/interns', internController.createIntern);




module.exports=router