const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: [true, "Job Title should be given"],
            minlength: [4, "Job Title must be unique and contain 4 characters"]
            
        },
        java: {
            type: Boolean
        },
        js: {
            type: Boolean
        },
        python: {
            type: Boolean
        },
        typeScript: {
            type: Boolean
        },
        flask: {
            type: Boolean
        },
        django: {
            type: Boolean
        },
        springBoot: {
            type: Boolean
        },
        react: {
            type: Boolean
        },
        description: {
            type: String,
            required: [true, "Please give the description"]
        }
    },{ timestamps: true }
)

const Job = mongoose.model('Job', JobSchema)
module.exports = Job