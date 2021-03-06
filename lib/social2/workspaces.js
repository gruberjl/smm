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
    {_id:workspaceDoc._id, workspaceDoc, connections:{}, channels:{}, workflows:{}, connectors:{}, dbMap:{}} :
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

  channels.forEach(c => workspace.channels[c._id] = c)
  workflows.forEach(w => workspace.workflows[w._id] = w)
  connectors.forEach(c => workspace.connectors[c._id] = c)
  Object.values(workspace.workflows).forEach(workflow => {
    const channel = Object.values(workspace.channels).find(c => c._id == workflow.channel)
    workspace.dbMap[workflow._id] = channel.dbName
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
  const results = Object.values(workspaces).map(workspace => {
    const connections = Object.values(workspace.connections)
    const messageArr = connections.map(connection => connection.getData())
    const messages = Promise.all(messageArr)
      .then(msgArr => {
        return Array.prototype.concat.apply([], msgArr)
      })
    return {workspace, messages}
  })

  for (let i = 0; i < results.length; i++) {
    results[i].messages = await results[i].messages
  }

  return results
}

module.exports = {add, getConnections, filterNewConnectors, workspaces, getData}
