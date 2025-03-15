const CompanyController = require('../controllers/company.controller')

module.exports = (app) => {
    app.get('/companies', CompanyController.getAllCompanies);
    app.post('/companies/register', CompanyController.createCompanies);
    app.post('/companies/login', CompanyController.loginCompany);
    app.post('/companies/logout', CompanyController.logoutCompany);

    app.patch('/companies/:id', CompanyController.updateOneCompany);
    app.delete('/companies/:id', CompanyController.deleteOneCompany);
}