const { default: mongoose } = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

//================Intern Schema=====================

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        trim: true,
        lowercase: true,
    },
    mobile: {
        type: String,
        required: [true, "Mobile number is Required"],
        unique: true,
    },
    collegeId: {
        type: ObjectId,
        ref: "College",
        required: [true, "College ID is Required"],
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("intern", internSchema)

