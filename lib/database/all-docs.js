const PouchDB = require('pouchdb')
const secret = require('../../secret.js')

const setDefaults = (options) => {
  const defaults = {include_docs:true}

  if (typeof options === 'object')
    return Object.assign(defaults, options)

  return defaults
}

const allDocs = (dbName, OPTIONS, autoClose=true) => new Promise(res => {
  const options = setDefaults(OPTIONS)
  let db
  if (typeof dbName === 'string')
    db = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/${dbName}`)
  else
    db = dbName

  db.allDocs(options, (err, response) => {
    if (autoClose) db.close()
    if (err) return res({error: {raw:err}})

    const docs = response.rows.map((row) => row.doc)
    res(docs)
  })
})

module.exports = {allDocs}
