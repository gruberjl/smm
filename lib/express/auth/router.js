const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/twitter', passport.authenticate('twitter'))

router.get('/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' })
)

module.exports = {router}
