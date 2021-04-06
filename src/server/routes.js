const {Router} = require('express')
const routes = Router()
const path = require('path');
const JobController = require('../controllers/jobController')

const views = path.join(__dirname + '/../views/')


routes.get('/', (req, res) => JobController.monitorJobs(req,res))
routes.get('/job', (req, res) => res.render(views + "job"))

routes.post('/job', (req,res) => JobController.createJob(req,res))
routes.get('/job/:id', (req, res) => JobController.showJob(req,res))
routes.get('/profile', (req, res) => JobController.showProfile(req,res))
routes.post('/profile', (req, res) => JobController.hourlyValue(req,res))

module.exports = routes