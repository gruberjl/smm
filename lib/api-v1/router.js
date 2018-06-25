const express = require('express')
const router = express.Router()
const db = require('../db/index.js')
const {handleResponse} = require('./handle-response.js')
const {handleParams} = require('./handle-params.js')
const validate = require('./validate')

router.use(express.json())

router.get('/v1/workspaces/:id',
  handleParams,
  db.workspaces.get,
  handleResponse
)

router.post('/v1/workspaces/:id/update',
  handleParams,
  validate.workspace,
  db.workspaces.update,
  handleResponse
)

module.exports = {router}
