const PouchDB = require('pouchdb')
const secret = require('../../secret.js')

const put = (dbName, data, OPTIONS={}, autoClose=true) => new Promise(res => {
  const options = OPTIONS
  let db
  if (typeof dbName === 'string')
    db = new PouchDB(`http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/${dbName}`)
  else
    db = dbName

  db.put(data, options, (err, response) => {
    if (autoClose) db.close()
    if (err) return res({error: {raw:err}})

    const newData = Object.assign({}, data, {_rev:response.rev})
    res(newData)
  })
})

module.exports = {put}
