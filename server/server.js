const express = require('express')
const app = express();
const cors  = require('cors')
const cookieParser = require('cookie-parser')

require("dotenv").config()
require('../server/config/mongoose.config')


app.use(express.json(), express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors());

const allSeekerRoutes = require('./routes/seeker.routes')
allSeekerRoutes(app);

const allJobRoutes = require('./routes/job.routes')
allJobRoutes(app);

const allCompanyRoutes = require('./routes/company.routes')
allCompanyRoutes(app);

app.listen(4500, () => {
    console.log("server is started at 4500")
})