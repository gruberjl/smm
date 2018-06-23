const passport = require('passport')
const {router} = require('./router.js')

const initialize = () => {
  require('./twitter.js')
  return passport.initialize()
}

module.exports = {router, initialize}
