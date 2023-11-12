const Seeker = require('../models/seeker.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_Key

module.exports = {
    getAllSeekers: (req, res) => {
        Seeker.find({})
            .then(seekers => {res.json(seekers)})
            .catch(err => {res.json("not found any seekers", err)})
    },

    createSeekers: async (req, res) => {
        try{
            const seeker = await Seeker.findOne({email:req.body.email})
            if (seeker) {
                res.status(400).json({message: 'User Already Exist'})
            }
            else {
                // console.log("body", req.body)
                const newSeeker = await Seeker.create(req.body)
                const userToken = jwt.sign({_id: newSeeker._id, email: newSeeker.email}, SECRET, {expiresIn: '96h'})
                console.log(userToken)
                res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 2 * 60 * 60 * 1000}).json(newSeeker)
            }
        }
        catch(err){
            console.log(err)
            res.status(400).json({error: err.message})
        }
    },

    loginSeeker: async (req, res) => {
        try{
            const seeker = await Seeker.findOne({email:req.body.email})
            if(seeker){
                const passwordsMatch = await bcrypt.compare(req.body.password, seeker.password)
                if (passwordsMatch){
                    const userToken = jwt.sign({_id: seeker._id, email:seeker.email}, SECRET, {expiresIn:'96h'})
                    res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge: 2 * 60 * 60 * 1000}).json(seeker)
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

    // createSeekers: (req, res) => {    
    //     //Seeker.create(req.body) //this can be tested from postman
    //     console.log("body", req.body.newSeeker)
    //     Seeker.create(req.body) // this line can be used from UI
    //         .then(newSeeker => {res.status(200).json(newSeeker)})
    //         .catch(err => {res.status(500).json(err), console.log(err)}) 
    // },

    // loginSeeker: (req, res) => {
    //     const {email, password} = req.body
    //     Seeker.findOne({email: email})
    //         .then(seeker => {
    //             if(seeker) {
    //                 if(seeker.password == password) {
    //                     res.json("success")
    //                 }else{
    //                     res.json("Password is incorrect")
    //                 }
    //             }
    //         }) 
    // },
    logoutSeeker: (req, res) => {
        // Cookie is not clearing - don't know why
        res.clearCookie('userToken')
        res.sendStatus(200)
    },
}