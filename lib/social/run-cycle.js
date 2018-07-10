const {getData} = require('./get-data.js')
const {writeData} = require('./write-data.js')

const runCycle = (workspace) => getData(workspace)
  .then(messages => writeData(workspace, messages))

module.exports = {runCycle}
