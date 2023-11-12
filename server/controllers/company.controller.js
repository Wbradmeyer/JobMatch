const Company = require('../models/company.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_Key

module.exports = {
    getAllCompanies: (req, res) => {
        Company.find({})
            .then(companies => {res.json(companies)})
            .catch(err => {res.json("not found any companies", err)})
    },

    createCompanies: async (req, res) => {
        try{
            const company = await Company.findOne({email:req.body.email})
            if (company) {
                res.status(400).json('Company Already Exist')
            }
            else {
                const newCompany = await Company.create(req.body)
                const userToken = jwt.sign({_id: newCompany._id, email: newCompany.email}, SECRET, {expiresIn: '96h'})
                console.log(userToken)
                res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 2 * 60 * 60 * 1000}).json(newCompany)
            }
        }
        catch(err){
            console.log(err)
            res.status(400).json({error: err})
        }
    },

    // createCompanies: (req, res) => {    
    //     //Company.create(req.body) //this can be tested from postman
    //     console.log("body", req.body.newCompany)
    //     Company.create(req.body) // this line can be used from UI
    //         .then(newCompany => {res.status(200).json(newCompany)})
    //         .catch(err => {res.status(500).json(err), console.log(err)}) 
    // },

    loginCompany: async (req, res) => {
        try{
            const company = await Company.findOne({email:req.body.email})
            if(company){
                const passwordsMatch = await bcrypt.compare(req.body.password, company.password)
                if (passwordsMatch){
                    const userToken = jwt.sign({_id: company._id, email:company.email}, SECRET, {expiresIn:'96h'})
                    res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge: 2 * 60 * 60 * 1000}).json(company)
                }
                else{
                    res.status(400).json({message:'Invalid Email/Password'})
                }
            }
            else{
                res.status(400).json({message:'Invalid Email/Password'})
            }
        }
        catch(err){
            res.status(400).json({error: err})
        }
    },

    logoutCompany: (req, res) => {
        res.clearCookie('companyToken')
        res.sendStatus(200)
    },
}