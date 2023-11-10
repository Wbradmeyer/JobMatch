const CompanyController = require('../controllers/company.controller')

module.exports = (app) => {
    app.get('/companies', CompanyController.getAllCompanies);
    app.post('/company/register', CompanyController.createCompanies);
    app.post('/company/login', CompanyController.loginCompany);
    app.post('/company/logout', CompanyController.logoutCompany)
}