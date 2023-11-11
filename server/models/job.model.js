const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: [true, "Job Title should be given"],
            minlength: [4, "Job Title must be unique and contain 4 characters"]
            
        },
        languages: {
            type: Array
        },
        frameworks: {
            type: Array
        },
        description: {
            type: String,
            required: [true, "Please give the description"]
        },
        companyId: {
            type: String
        }
    },{ timestamps: true }
)

const Job = mongoose.model('Job', JobSchema)
module.exports = Job