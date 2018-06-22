const express = require('express')
const router = express.Router()
const db = require('../db/index.js')

router.use(express.json())

router.get('/v1/workspaces/:id',
  db.workspaces.get,
  db.handleResponse
)

router.post('/v1/workspaces/:id/update',
  db.workspaces.update,
  db.handleResponse
)

// router.post('/api/v1/workspaces/update', express.json(), (req, res) => {
//   api.workspaces.update(req.body).then((saveResponse) => {
//     res.status(saveResponse.statusCode).json(saveResponse.response)
//   }).catch((saveErr) => {
//     res.status(400).json(saveErr)
//   })
// })

module.exports = {router}
