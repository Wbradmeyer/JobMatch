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

CompanySchema.virtual('confirmPassword')
.get(() => this.confirmPassword)
.set((value) => this.confirmPassword = value)

CompanySchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

CompanySchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});


const Company = mongoose.model('Company', CompanySchema)
module.exports = Company