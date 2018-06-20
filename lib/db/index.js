const mongodb = require('mongo-mock')
mongodb.max_delay = 0
const MongoClient = mongodb.MongoClient
const seed = require('./seed.js')
const $ = require('mongo-dot-notation')

const url = 'mongodb://localhost:27017/db'
let db = null

const getDb = async () => {
  if (!db) {
    db = await MongoClient.connect(url)
    await db.collection('workspaces').insertOne(seed.workspace)
  }

  return db
}

const create = async (request) => {
  const db = await getDb()
  const response = await db.collection(request.collection).insertOne(request.data)
  return response
}

const read = async (request) => {
  const db = await getDb()
  const response = await db.collection(request.collection).find(request.query).limit(request.limit).toArray()
  return response
}

const update = async (request) => {
  const db = await getDb()
  const response = await db.collection(request.collection)
    .updateOne(request.query, $.flatten(request.data))

  return response
}

const destroy = async (request) => {
  const db = await getDb()
  const response = await db.collection(request.collection).deleteOne(request.query)
  return response
}

module.exports = {create, read, update, destroy, getDb}
