const EventEmitter = require('events')
const PouchDB = require('./pouchdb')
const {getDb} = require('./get-db')
const {allDocs} = require('./all-docs')

class Sync extends EventEmitter {
  constructor(server, dbName) {
    super()
    this.server = server
    this.dbName = dbName
    this.remoteDb = getDb(server, dbName)
    this.localDb = getDb('', dbName, {adapter: 'memory'})
    PouchDB.replicate(this.remoteDb, this.localDb).on('complete', this.onInitialReplication.bind(this))
  }

  get allDocs() {
    return allDocs()(this.localDb, {}, false)
  }

  async onInitialReplication() {
    const docs = await this.allDocs
    this.emit('initialReplicationComplete', docs)
    this.emitChange({docs})
    this.replication = PouchDB.replicate(this.remoteDb, this.localDb, {live:true, retry: true})
    this.replication.on('change', this.emitChange)
    this.replication.on('err', (err) => console.log(err))
  }

  async emitChange(response) {
    this.emit('diff', response.docs)
    const docs = await allDocs()(this.localDb, {}, false)
    this.emit('change', docs)
  }
}

module.exports = {Sync}
