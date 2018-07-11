const {getDb} = require('./get-db')

const get = (serverPath='') => (dbName, docId, options={}, autoClose=true) => new Promise(res => {
  const db = getDb(serverPath, dbName)

  db.get(docId, options, (err, doc) => {
    if (autoClose) db.close()
    if (err) return res({error: {raw:err}})

    res(doc)
  })
})

module.exports = {get}
