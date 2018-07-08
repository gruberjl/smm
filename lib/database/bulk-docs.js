const {getDb} = require('./get-db')

const bulkDocs = (serverPath='') => (dbName, data, autoClose=true) => new Promise(res => {
  const db = getDb(serverPath, dbName)

  db.bulkDocs(data, (err, response) => {
    if (autoClose && db._adapter == 'memory' && serverPath == '') db.destroy()
    if (autoClose) db.close()
    if (err) return res({error: {raw:err}})

    const saved = response.filter(res => res.ok)
      .map(res => {
        const doc = data.find(doc => doc._id == res.id)
        doc._rev = res.rev
        return doc
      })

    res({response, saved})
  })
})

module.exports = {bulkDocs}
