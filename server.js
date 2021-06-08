if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    const dotenvParseVariables = require('dotenv-parse-variables')

    let env = dotenv.config({})
    if (env.error) throw env.error
    env = dotenvParseVariables(env.parsed)
 
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

// MIDDLEWARE:

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
//app.use(express.json())
//app.use(express.urlencoded({ extended: false }));

// ROUTERS:

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.use('/', indexRouter)
app.use('/authors', authorRouter)

// DATABASE CONFIG:

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.listen(process.env.PORT || 3000)