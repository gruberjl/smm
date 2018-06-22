const io = require('./io.js').getIO()

const join = (roomId, socket) => {
  socket.join(roomId)
}

const leave = (roomId, socket) => {
  socket.leave(roomId)
}

module.exports = {create}
