const Job = require('../models/job.model')

module.exports = {
    getAllJobs: (req, res) => {
        Job.find({})
            .then(jobs => {res.json(jobs)})
            .catch(err => {res.json("not found any jobs", err)})
    },

    createJobs: (req, res) => {     
        console.log("body", req.body.newJob)
        Job.create(req.body)
            .then(newJob => {res.status(200).json(newJob)})
            .catch(err => {res.status(500).json(err), console.log(err)}) 
    },
    getOneJob: (req, res) => {
        console.log(req.params.id)
        Job.findOne({_id: req.params.id})
            .then(oneJob => res.json(oneJob))
            .catch(err => {res.json("cant get the Job", err)})
    },
    updateOneJob: (req, res) => {
        console.log("hello", req.body)
        Job.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators:true})
            .then(updateOne => res.status(200).json(updateOne))
            .catch(err => { res.status(500).json(err), console.log(err)} )
    },
    deleteOneJob: (req, res) => {
        console.log(req.params.id)
        Job.deleteOne({_id: req.params.id})
            .then(deleteJob => res.json(deleteJob))
            .catch(err => console.log(err))
    }
}