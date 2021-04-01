const {Router} = require('express')
const routes = Router()
const path = require('path');

const basePath = path.join(__dirname + '/../views/')

routes.get('/', (req, res) => res.sendFile(basePath + ("index.html")))
routes.get('/job', (req, res) => res.sendFile(basePath + ("job.html")))
routes.get('/job/edit', (req, res) => res.sendFile(basePath + ("job-edit.html")))
routes.get('/profile', (req, res) => res.sendFile(basePath + ("profile.html")))

module.exports = routes