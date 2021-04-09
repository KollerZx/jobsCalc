const {Router} = require('express')
const routes = Router()
const JobController = require('../controllers/jobController')
const ProfileController = require('../controllers/ProfileController')
const DashboardController = require('../controllers/DashboardController')
routes.get('/', DashboardController.index)
routes.get('/job', (req, res) => res.render("job"))

routes.post('/job', JobController.create)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.getProfile)
routes.post('/profile', ProfileController.hourlyValue)

module.exports = routes