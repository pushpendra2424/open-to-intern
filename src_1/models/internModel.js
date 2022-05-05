const { default: mongoose } = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        validate: {
            validator:
                function (v) { return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(v) },
            message: "Please enter a valid email",
            isAsync: false,
        },
        trim: true,
        lowercase: true,
    },
    mobile: {
        type: Number,
        required: [true, "Mobile number is Required"],
        unique: true,
        validate: {
            validator:
                function (v) { return /^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/.test(v) },
            message: "Please enter 10 digit Mobile Number",
        },
        //type: String,
        //match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        ///^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

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
},
// { timestamps: true }
)

module.exports = mongoose.model("intern", internSchema)


