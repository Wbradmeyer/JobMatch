const JobController = require('../controllers/job.controller')

module.exports = (app) => {
    app.get('/jobs', JobController.getAllJobs);
    app.post('/jobs/new', JobController.createJobs);
    app.get('/jobs/:id', JobController.getOneJob);
    app.patch('/jobs/:id', JobController.updateOneJob);
    app.delete('/jobs/:id', JobController.deleteOneJob);
}