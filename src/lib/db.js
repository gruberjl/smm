const PouchDB = require('pouchdb').default
const {store} = require('./store')

const workspaceDB = new PouchDB('http://10.0.75.1:5984/workspace1')

workspaceDB.allDocs({include_docs:true}).then((res) => {
  const docs = res.rows.map((row) => row.doc)
  const action = Object.assign({type:'SET_WORKSPACE'}, {docs})
  console.log('db is dispatching SET_WORKSPACE')
  console.log(action)
  store.dispatch(action)
})

workspaceDB.changes({live:true, since:'now', include_docs:true})
  .on('change', (change) => {
    const action = Object.assign({type:'WORKSPACE_UPDATED'}, {doc:change.doc})
    console.log('DB dispatching')
    console.log(action)
    store.dispatch(action)
  })
