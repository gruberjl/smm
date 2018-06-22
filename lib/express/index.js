const {resolve} = require('path')
const express = require('express')
const app = express()
const http = require('http').Server(app)
// const IO = require('../io/io.js').setIO(http)
// const io = require('../io')
const api = require('../api-v1')
const db = require('../db')

app.set('view engine', 'pug')
app.set('views', resolve(__dirname, 'views'))

// IO.on('connection', io.setup)
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
