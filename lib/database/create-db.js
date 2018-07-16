const {getDb} = require('./get-db')

const createDb = (serverPath='') => (dbName, dbType, autoClose=true) => new Promise(res => {
  if (dbType != 'channel') throw 'attempting to create a db with an unknown type'

  const db = getDb(serverPath, dbName)
  db.info((err, info) => {
    if (autoClose) db.close()
    if (err) return res({error: {raw:err}})
    return res(info)
  })
})

module.exports = {createDb}
