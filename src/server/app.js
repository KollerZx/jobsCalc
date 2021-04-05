const { urlencoded } = require('express');
const express = require('express');
const app = express();
const routes = require('./routes')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

module.exports = app