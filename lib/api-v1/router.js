const express = require('express')
const router = express.Router()
const db = require('../db/index.js')
const handleResponse = require('./handle-reponse.js')

router.use(express.json())

router.get('/v1/workspaces/:id',
  db.workspaces.get,
  handleResponse
)

router.post('/v1/workspaces/:id/update',
  db.workspaces.update,
  handleResponse
)

module.exports = {router}
