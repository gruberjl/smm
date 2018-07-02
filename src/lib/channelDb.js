const PouchDB = require('pouchdb').default
const {store} = require('./store')
const containers = []

const start = (dbName) => {
  console.log('starting channel db: ', dbName)
  let container = containers.find(c => c.dbName == dbName)
  if (!container) container = {dbName}

  if (!container.db) {
    container.db = new PouchDB(`http://10.0.75.1:5984/${dbName}`)

    container.db.allDocs({include_docs:true}).then((res) => {
      const docs = res.rows.map((row) => row.doc)
      const action = Object.assign({type:'CHANNELS_DB_ADD_MESSAGES', dbName}, {docs})
      store.dispatch(action)
    })
  }

  if (container.status != 'active') {
    container.status = 'active'
    const since = container.since || 'now'
    container.sync = container.db.changes({live:true, since, include_docs:true})
      .on('change', (change) => {
        const action = Object.assign({type:'CHANNELS_DB_ADD_MESSAGES', dbName}, {docs:[change.doc]})
        container.since = change.doc._id
        store.dispatch(action)
      })
  }

  containers.push(container)
  store.dispatch({type:'CHANNELS_DB_UPDATE', container})
}

const stop = (dbName) => {
  const container = containers.find(c => c.dbName == dbName)
  container.status = 'stopped'
  container.sync.cancel()
}

module.exports = {start, stop}
