const { default: mongoose } = require("mongoose")

//==============College Schema===============

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name is required']
    },
    
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },

    logoLink: {
        type: String,
        required: "URL can't be empty",
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('College', collegeSchema, 'colleges')