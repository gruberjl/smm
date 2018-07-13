const uuid = require('uuid/v4')
const {UPDATING, SAVED} = require('./statuses')
const {createDb, put} = require('../../lib/database/server')

class Channel {
  constructor(doc, workspace, status=SAVED) {
    this.doc = doc
    this.workspace = workspace
    this.status = status
    this.buildChannel()
  }

  get isBuilt() {
    return Boolean(this.doc.dbName)
  }

  async save() {
    const results = await put(this.workspace.db.name, this.doc)
    this.status = SAVED
    return results
  }

  async buildChannel() {
    if (!this.isBuilt) {
      this.status = UPDATING
      const dbName = `channel-${uuid()}`
      await createDb(dbName, 'channel')
      this.doc.dbName = dbName
      await this.save()
    }
  }
}

module.exports = {Channel}
