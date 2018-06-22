const {resolve} = require('path')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const IO = require('socket.io')(http)
const io = require('../io')
const api = require('../api-v1')

app.set('view engine', 'pug')
app.set('views', resolve(__dirname, 'views'))

IO.on('connection', io.setup)

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/api', api.router)

app.use('/assets', express.static(resolve(__dirname, 'assets')))

http.listen(3000, function(){
  console.log('listening on *:3000')
})
