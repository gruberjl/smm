const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../../db')

const setIdentifiers = (req, res, next) => {
  const identifiers = {workspaceId:req.query.workspaceId, connectorId: req.query.connectorId}
  res.cookie('identifiers', identifiers, {httpOnly:true})
  next()
}

const getIdentifiers = (req, res, next) => {
  req.connectorId = req.cookies.identifiers.connectorId
  req.workspaceId = req.cookies.identifiers.workspaceId
  res.clearCookie('identifiers')
  next()
}

const createAccount = (req, res, next) => {
  console.info('creating account')
  console.info(req.user.account)
  db.accounts.put(req.user.account).then(() => {
    next()
  }).catch(e => {
    console.error(e)
  })
}

const createConnector = (req, res, next) => {
  console.info('creating connector')
  req.user.data._id = req.connectorId
  req.user.data.docType = 'connector'
  console.info(req.user.data)
  db.put(req.user.data).then(() => {
    next()
  })
}

router.get('/twitter', setIdentifiers, passport.authenticate('twitter'))

router.get('/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  getIdentifiers,
  createAccount,
  createConnector,
  (req, res) => {
    res.render('auth-callback')
  }
)

module.exports = {router}
