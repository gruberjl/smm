const axios = require('axios')

const save = (db, data, workspaceId) => axios({
  method: 'post',
  url: '/api/v1/save',
  data: {db, data, workspaceId}
})


module.exports = {save}
