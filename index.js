const express = require('express');
const app = express();
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')
require('./config/mongodb')
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyParser.json());
app.db = db
app.mongoose = mongoose



app.use(express.urlencoded({ extended: true }))

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)


app.listen(8002, ()=>{
    console.log('backend executado...'.green)
})