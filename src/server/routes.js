const {Router} = require('express')
const routes = Router()
const JobController = require('../controllers/jobController')
const ProfileController = require('../controllers/ProfileController')
routes.get('/', (req, res) => JobController.index(req,res))
routes.get('/job', (req, res) => res.render("job"))

routes.post('/job', (req,res) => JobController.create(req,res))
routes.get('/job/:id', (req, res) => JobController.show(req,res))
routes.post('/job/:id', (req, res) => JobController.update(req,res))
routes.post('/job/delete/:id', (req, res) => JobController.delete(req,res))
routes.get('/profile', (req, res) => ProfileController.getProfile(req,res))
routes.post('/profile', (req, res) => ProfileController.hourlyValue(req,res))

module.exports = routes