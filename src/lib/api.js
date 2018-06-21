const axios = require('axios')

const update = (collection, data, workspaceId) => axios({
  method: 'post',
  url: '/api/v1/update',
  data: {collection, data, query:{_id: workspaceId}}
})


module.exports = {update}
