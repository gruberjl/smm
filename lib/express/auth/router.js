const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../../db')
const {handleResponse} = require('../../api-v1')

const setWorkspace = (req, res, next) => {
  res.cookie('activeWorkspace', 1, {httpOnly:true})
  next()
}

const getWorkspace = (req, res, next) => {
  console.log('getting workspace')
  console.log(req.cookies.activeWorkspace)
  req.query = {id: req.cookies.activeWorkspace}
  res.clearCookie('activeWorkspace')
  next()
}

const createAccount = (req, res, next) => {
  console.log('creating account')
  db.create(req.account).then(() => {
    next()
  })
}

router.get('/twitter', setWorkspace, passport.authenticate('twitter'))

router.get('/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  getWorkspace,
  createAccount,
  db.workspaces.update,
  handleResponse
)

module.exports = {router}
