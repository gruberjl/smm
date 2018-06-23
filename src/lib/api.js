const axios = require('axios')
const uuid = require('uuid/v4')

const update = (workspaceId, data) => axios({
  method: 'post',
  url: `/api/v1/workspaces/${workspaceId}/update`,
  data
})

const saveItem = (workspaceId, item, table) => {
  const id = item.id || uuid()

  const data = {}
  data[table] = {}
  data[table][id] = Object.assign({}, item, {id})

  return update(workspaceId, data)
}

const deleteItem = (workspaceId, id, table) => {
  const data = {}
  data[table] = {}
  data[table][id] = null
  return update(workspaceId, data)
}

const workspaces = {update, saveItem, deleteItem}

module.exports = {workspaces}
