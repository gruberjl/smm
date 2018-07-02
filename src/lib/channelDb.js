const PouchDB = require('pouchdb').default
const {store} = require('./store')
const containers = []

const start = (dbName) => {
  console.log('starting channel db: ', dbName)
  const db = new PouchDB(`http://10.0.75.1:5984/${dbName}`)

  db.allDocs({include_docs:true}).then((res) => {
    const docs = res.rows.map((row) => row.doc)
    const action = Object.assign({type:'CHANNELS_DB_ADD_MESSAGES', dbName}, {docs})
    store.dispatch(action)
  })

  const sync = db.changes({live:true, since:'now', include_docs:true})
    .on('change', (change) => {
      const action = Object.assign({type:'CHANNELS_DB_ADD_MESSAGES', dbName}, {docs:[change.doc]})
      store.dispatch(action)
    })

  const container = {db, dbName, status: 'active', sync}
  containers.push(container)

  store.dispatch({type:'CHANNELS_DB_UPDATE', container})
}

const stop = (dbName) => {
  const container = containers.find(c => c.dbName == dbName)
  container.sync.cancel()
}

module.exports = {start, stop}
