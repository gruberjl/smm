const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../../db')
const {parseResponse} = require('../../api-v1')

const setIdentifiers = (req, res, next) => {
  const identifiers = {workspaceId:1, connectorId: req.query.connectorId}
  res.cookie('identifiers', identifiers, {httpOnly:true})
  next()
}

const getIdentifiers = (req, res, next) => {
  console.info('getting workspace')
  console.info(req.cookies.identifiers)
  req.connectorId = req.cookies.identifiers.connectorId
  req.query = {id: req.cookies.identifiers.workspaceId}
  req.data = {connectors: {}}
  req.data.connectors[req.connectorId] = {id: req.connectorId}
  res.clearCookie('identifiers')
  next()
}

const createAccount = (req, res, next) => {
  console.info('creating account')
  console.info(req.acount)
  console.info(req.data)
  db.create(req.account).then(() => {
    next()
  })
}

router.get('/twitter', setIdentifiers, passport.authenticate('twitter'))

router.get('/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  getIdentifiers,
  createAccount,
  db.workspaces.update,
  parseResponse,
  (req, res) => {
    res.render('auth-callback')
  }
)

module.exports = {router}
