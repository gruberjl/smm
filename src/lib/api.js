const axios = require('axios')
const uuid = require('uuid/v4')

const update = (workspaceId, data) => axios({
  method: 'post',
  url: `/api/v2/workspaces/${workspaceId}/update`,
  data
})

const remove = (workspaceId, data) => axios({
  method: 'post',
  url: `/api/v2/workspaces/${workspaceId}/remove`,
  data
})

const saveItem = (workspaceId, item) => {
  if (!item._id)
    item._id = uuid()

  return update(workspaceId, item)
}

const deleteItem = (workspaceId, doc) => {
  return remove(workspaceId, doc)
}

const workspaces = {update, saveItem, deleteItem}

module.exports = {workspaces}
