const SeekerController = require('../controllers/seeker.controller')

module.exports = (app) => {
    app.get('/seekers', SeekerController.getAllSeekers);
    app.post('/seekers/register', SeekerController.createSeekers);
    app.post('/seekers/login', SeekerController.loginSeeker);
    app.post('/seekers/logout', SeekerController.logoutSeeker)

    app.patch('/seekers/:id', SeekerController.updateOneSeeker);
    app.delete('/seekers/:id', SeekerController.deleteOneSeeker);
}