const axios = require('axios')

const update = (table, data, workspaceId) => axios({
  method: 'post',
  url: '/api/v1/workspaces/update',
  data: {table, data, id:workspaceId}
})

const workspaces = {update}

module.exports = {workspaces}
