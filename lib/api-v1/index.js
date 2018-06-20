const fs = require('fs')
const {join} = require('path')
const uuid = require('uuid/v4')

const create = (req) => {
  const WORKSPACE = join(__dirname, '..', 'db', 'data', 'workspace.json')
  const db = require(WORKSPACE)
  const itm = Object.assign({}, req.data, {id:uuid()})
  db[req.table][itm.id] = itm
  fs.writeFileSync(WORKSPACE, JSON.stringify(db, null, '\t'), 'utf8')
}

const update = (req) => {
  const WORKSPACE = join(__dirname, '..', 'db', 'data', 'workspace.json')
  const db = require(WORKSPACE)
  Object.keys(req.data).forEach((key) => {
    db[req.table][req.data.id][key] = req.data[key]
  })
  fs.writeFileSync(WORKSPACE, JSON.stringify(db, null, '\t'), 'utf8')
}

const save = (req) => {
  if (req.data.id)
    create(req)

  update(req)


  console.dir(req)
}

module.exports = {save}
