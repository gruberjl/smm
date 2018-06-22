const uuid = require('uuid/v4')
const {router} = require('./router.js')
const db = require('../db')

const update = (req) => {
  const item = Object.assign({}, req.data)

  if (!item.id)
    item.id = uuid()

  const data = {}
  data[req.table] = item
  return db.workspaces.update(req.id, data)
    .then((res) => Object.assign({}, res, {response:{item}}))
}

const get = (req) => {
  return db.workspaces.get(req.id)
}

const workspaces = {update, get}

module.exports = {workspaces, router}
