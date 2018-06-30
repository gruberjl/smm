const axios = require('axios')
const uuid = require('uuid/v4')

const update = (workspaceId, docType, data) => axios({
  method: 'post',
  url: `/api/v2/workspaces/${workspaceId}/${docType}`,
  data
})

const remove = (workspaceId, docType, data) => axios({
  method: 'post',
  url: `/api/v2/workspaces/${workspaceId}/${docType}/remove`,
  data
})

const saveItem = (workspaceId, item) => {
  if (!item._id)
    item._id = uuid()

  return update(workspaceId, item.docType, item)
}

const deleteItem = (workspaceId, doc) => {
  return remove(workspaceId, doc.docType, doc)
}

const workspaces = {update, saveItem, deleteItem}

module.exports = {workspaces}
