const uuid = require('uuid/v4')
const db = require('../db')

const create = async (req) => {
  req.data._id = uuid()
  const response = db.create(req)
  return response
}

const read = async (req) => {
  const response = db.read(req)
  return response
}

const update = async (req) => {
  const response = db.update(req)
  return response
}

const destroy = async (req) => {
  const response = db.destroy(req)
  return response
}

const save = async (req) => {
  if (req.data._id)
    return create(req)

  return update(req)
}

module.exports = {save, create, read, update, destroy}
