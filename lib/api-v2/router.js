const express = require('express')
const router = express.Router()
const db = require('../db')
router.use(express.json())

router.post('/v2/workspaces/:_id/update',
  (req, res) => {
    db.put(req.body).then((dbRes) => {
      console.info('document put successfully')
      console.info(dbRes)
      res.status(204).json(dbRes)
    })
  }
)

router.post('/v2/workspaces/:_id/remove',
  (req, res) => {
    console.log('removing item')
    console.log(req.body)
    db.remove(req.body).then((dbRes) => {
      console.info('document removed successfully')
      console.info(dbRes)
      res.status(204).json(dbRes)
    }).catch(err => {
      res.status(500).json(err)
    })
  }
)

router.all('*', (req, res) => res.status(404).json({error:'Not found'}))

module.exports = {router}
