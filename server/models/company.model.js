const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name should be given"],
            minlength: [4, "Name must be unique and contain 4 characters"]
            
        },
        email: {
            type: String,
            required: [true, "Email can not be blank"]
        },
        password: {
            type: String,
            required: [true, "Password can not be blank"],
            minlength: [7, "Password must be at least 7 characters"]
        },
        confirm_password : {
            type : String,
            required : true,
        },
        location: {
            type: String,
            required: [true, "Please give the Location of Job seeker"]
        },
        aboutUs: {
            type: String,
            required: [true, "Please enter the bio of company"]
        }
    },{ timestamps: true }
)

const Company = mongoose.model('Company', CompanySchema)
module.exports = Company