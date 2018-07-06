const {getDb} = require('./get-db')

const setDefaults = options => Object.assign({include_docs:true}, options)

const allDocs = (serverPath='') => (dbName, options={}, autoClose=true) => new Promise(res => {
  options = setDefaults(options)

  const db = getDb(serverPath, dbName)

  db.allDocs(options, (err, response) => {
    if (autoClose && db._adapter == 'memory' && serverPath == '') db.destroy()
    if (autoClose) db.close()
    if (err) return res({error: {raw:err}})

    const docs = response.rows.map((row) => row.doc)
    res(docs)
  })
})

module.exports = {allDocs}
