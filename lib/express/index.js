const {resolve} = require('path')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const api = require('../api-v1')
const db = require('../db')
const auth = require('./auth')
const session = require('express-session')

app.use(session({secret: 'keyboard cat'}))

app.use(auth.initialize())
app.use('/auth', auth.router)

app.set('view engine', 'pug')
app.set('views', resolve(__dirname, 'views'))

require('../ws').server.setup()

app.get('/',
  (req, res, next) => {
    db.workspaces.read('1').then((workspace) => {
      req.workspace = workspace
      next()
    })
  },
  (req, res) => {
    const workspace = JSON.stringify(req.workspace).replace(/</g, '\\u003c')
    res.render('index', {workspace})
  }
)

app.use('/api', api.router)

app.use('/assets', express.static(resolve(__dirname, 'assets')))

http.listen(3000, function(){
  console.log('listening on *:3000')
})
