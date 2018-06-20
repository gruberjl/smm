const axios = require('axios')

const save = (collection, data, workspaceId) => axios({
  method: 'post',
  url: '/api/v1/save',
  data: {collection, data, workspaceId}
})


module.exports = {save}
