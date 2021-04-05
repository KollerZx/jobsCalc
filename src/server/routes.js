const {Router} = require('express')
const routes = Router()
const path = require('path');

const views = path.join(__dirname + '/../views/')


const profile = {
    name: "Henrique",
    avatar: "https://avatars.githubusercontent.com/u/38964774?v=4",
    "monthly-budget": 3000,
    "days-per-week":5,
    "hours-per-day":5,
    "vacation-per-year":4
}
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))

module.exports = routes