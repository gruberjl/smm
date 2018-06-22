const io = require('./io.js').getIO()

const create = (id) => {
  const nsp = io.of(`/${id}`)

  nsp.on('connection', () => {
    console.log(`Someone connected to IO namespace ${id}`)
  })
}

module.exports = {create}
