const {newConnection} = require('./new-connection')

const workspaces = {}

const filterNewConnectors = (workspaceDoc, docs) => {
  const workspace = workspaces[workspaceDoc._id]
  const connectors = docs.filter(doc => doc.docType == 'connector')
  if (!workspace) return connectors
  const connectionKeys = Object.keys(workspace.connections).map(key => workspace.connections[key]._id)
  return connectors.filter(c => !connectionKeys.includes(c._id))
}

const add = (workspaceDoc, docs, accounts) => {
  const isNew = !workspaces[workspaceDoc._id]

  const workspace = isNew ?
    {_id:workspaceDoc._id, workspaceDoc, connections:{}} :
    workspaces[workspaceDoc._id]

  const connectors = docs.filter(d => d.docType == 'connector')
  connectors.forEach(c => {
    if (workspace.connections[c._id])
      workspace.connections[c._id].updateConnector(c)
    else {
      const account = accounts.find(a => a._id == c.account._id)
      const connection = newConnection(c, account)
      workspace.connections[connection._id] = connection
    }
  })

  const workflows = docs.filter(d => d.docType == 'workflow')
  workflows.forEach(w => {
    const c = workspace.connections[w.connector]
    c.updateWorkflow(w)
  })

  const channels = docs.filter(d => d.docType == 'channel')
  channels.forEach(channel => {
    const connections = Object.keys(workspace.connections).map(key => workspace.connections[key])
    connections.forEach(c => c.updateChannel(channel))
  })

  if (isNew) workspaces[workspaceDoc._id] = workspace
}

const getConnections = () => {
  const connections = []
  Object.keys(workspaces).forEach(wKey => {
    const workspace = workspaces[wKey]
    Object.keys(workspace.connections).forEach(key => {
      connections.push(workspace.connections[key])
    })
  })

  return connections
}

const getData = async () => {
  const promises = await Promise.all(getConnections().map(connection => connection.getData()))
  const data = [].concat(...promises)
  return data
}

module.exports = {add, getConnections, filterNewConnectors, workspaces, getData}
