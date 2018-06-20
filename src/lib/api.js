const axios = require('axios')

const save = (table, data, workspaceId) => axios({
  method: 'post',
  url: '/api/v1/save',
  data: {table, data, workspaceId}
})


module.exports = {save}
