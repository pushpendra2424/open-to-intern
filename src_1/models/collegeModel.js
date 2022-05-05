const { default: mongoose } = require("mongoose")

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true,'Name is required']
    },
    fullName: {
        type: String,
        required: [true,'Fullname is required']
    },
    logoLink: {
        required: [true,'logo link required',],
        //URL: 'https://functionup.s3.ap-south-1.amazonaws.com/colleges/iith.png'
        type:String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, 
//{ timestamps: true }
)

module.exports = mongoose.model('College', collegeSchema, 'colleges')