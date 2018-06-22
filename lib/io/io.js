const IO = require('socket.io')

let io

const setIO = (http) => {
  io = IO(http)
  return io
}

const getIO = () => {
  if (!io)
    throw 'getIO is called before setIO lib/io/io.js'
    
  return io
}

module.exports = {getIO, setIO}
