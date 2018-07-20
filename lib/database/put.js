const {getDb} = require('./get-db')

const put = serverPath => (dbName, data, options={}, autoClose=true) => new Promise(res => {
  const db = getDb(serverPath, dbName)

  db.put(data, options, async (err, response) => {
    if (autoClose) await db.close()
    if (err) return res({error: {raw:err}})

    const newData = Object.assign({}, data, {_rev:response.rev})
    res(newData)
  })
})

module.exports = {put}
