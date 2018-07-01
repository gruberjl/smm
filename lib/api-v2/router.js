const express = require('express')
const router = express.Router()
const db = require('../db')
router.use(express.json())

let channelDbNumber = 0

router.post('/v2/workspaces/:_id/channel',
  (req, res, next) => {
    if (!req.body._rev) {
      channelDbNumber++
      req.body.dbName = `channel${channelDbNumber}`
      db.createChanelDb(req.body.dbName).then(() => {
        next()
      })
    } else {
      next()
    }
  },
  (req, res) => {
    db.put(req.body).then((dbRes) => {
      console.info('document put successfully')
      res.status(204).json(dbRes)
    })
  }
)

router.post('/v2/workspaces/:_id/channel/remove',
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

router.post('/v2/workspaces/:_id/workflow',
  (req, res) => {
    db.put(req.body).then((dbRes) => {
      console.info('document put successfully')
      console.info(dbRes)
      res.status(204).json(dbRes)
    })
  }
)

router.post('/v2/workspaces/:_id/workflow/remove',
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
