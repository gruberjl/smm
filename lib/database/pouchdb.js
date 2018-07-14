const isBrowser = require('is-browser')
const PouchDB = isBrowser ? require('pouchdb').default : require('pouchdb')

module.exports = PouchDB
