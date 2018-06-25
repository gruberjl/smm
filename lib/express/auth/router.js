const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../../db')
const {parseResponse} = require('../../api-v1')

const setIdentifiers = (req, res, next) => {
  const identifiers = {workspaceId:req.query.workspaceId, connectorId: req.query.connectorId}
  res.cookie('identifiers', identifiers, {httpOnly:true})
  next()
}

const getIdentifiers = (req, res, next) => {
  req.connectorId = req.cookies.identifiers.connectorId
  req.inquiry = {id: req.cookies.identifiers.workspaceId}
  res.clearCookie('identifiers')
  next()
}

const getData = (req, res, next) => {
  console.info('user:')
  console.info(req.user)
  req.data = {id: req.inquiry.id, connectors: {}}
  req.data.connectors[req.connectorId] = Object.assign({}, req.user.data, {id: req.connectorId})
  req.account = req.user.account
  next()
}

const createAccount = (req, res, next) => {
  console.info('creating account')
  console.info(req.account)
  console.info(req.data)
  db.create(req.account).then(() => {
    next()
  })
}

router.get('/twitter', setIdentifiers, passport.authenticate('twitter'))

router.get('/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  getIdentifiers,
  getData,
  createAccount,
  db.workspaces.update,
  parseResponse,
  (req, res) => {
    res.render('auth-callback')
  }
)

module.exports = {router}
