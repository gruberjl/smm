const {resolve} = require('path')
const express = require('express')
const app = express()
const auth = require('./auth')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const {router} = require('./api')

app.use(cookieParser('keyboard cat'))
app.use(session({secret: 'keyboard cat', resave:false, saveUninitialized:false}))

app.use(auth.initialize())
app.use('/auth', auth.router)
app.use('/api/v1/', router)

app.set('view engine', 'pug')
app.set('views', resolve(__dirname, 'views'))

app.use('/assets', express.static(resolve(__dirname, 'assets')))

app.get('*', (req, res) => {
  res.render('index')
})

module.exports = {app}
