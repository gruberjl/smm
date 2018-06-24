const express = require('express')
const router = express.Router()
const passport = require('passport')

const setWorkspace = (req, res, next) => {
  res.cookie('activeWorkspace', 1, {httpOnly:true})
  next()
}

const getWorkspace = (req, res, next) => {
  req.activeWorkspace = req.cookies.activeWorkspace
  res.clearCookie('activeWorkspace')
  next()
}

router.get('/twitter', setWorkspace, passport.authenticate('twitter'))

router.get('/twitter/callback',
  getWorkspace,
  passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' })
)

module.exports = {router}
