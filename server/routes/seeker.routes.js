const SeekerController = require('../controllers/seeker.controller')

module.exports = (app) => {
    app.get('/seekers', SeekerController.getAllSeekers);
    app.post('/seeker/register', SeekerController.createSeekers);
    app.post('/seeker/login', SeekerController.loginSeeker);
    app.post('/seeker/logout', SeekerController.logoutSeeker)

    app.patch('/seekers/:id', SeekerController.updateOneSeeker);
    app.delete('/seekers/:id', SeekerController.deleteOneSeeker);
}