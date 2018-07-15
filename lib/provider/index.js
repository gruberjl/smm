const twitter = require('./twitter')

const providers = {twitter}

const submit = (provider, action, ...args) => providers[provider][action](...args)

module.exports = {submit}
