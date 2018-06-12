const levelup = require('levelup')
const leveldown = require('leveldown')

const db = levelup(leveldown('./data/workspaces'))

const get = (id) => new Promise((res) => {
  db.get(id, (err, value) => {
    if (err) res({error: {raw:err}})

    return res(value)
  })
})

const create = (id, data) => new Promise(async (res) => {
  const getResults = await get(id)

  if (!getResults.error) {
    return res({error: {summary:'Already Exists'}})
  }

  if (getResults.error.raw.type == 'NotFoundError') {
    db.put(id, data, (err) => {
      if (err) return res({error: {raw:err}})

      return res(data)
    })
  } else {
    return res({error:{raw:getResults}})
  }
})

const remove = (id) => new Promise((res) => {
  db.del(id, (err) => {
    if (err) return res({error: {raw:err}})

    return res({status:204})
  })
})

module.exports = {get, create, remove}
