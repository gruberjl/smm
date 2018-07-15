const Client = require('./client')
const {post, unpost} = require('./post')
const {like, unlike} = require('./like')
const {share, unshare} = require('./share')

module.exports = {
  Client, post, unpost, like, unlike, share, unshare
}
