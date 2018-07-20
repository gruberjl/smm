const axios = require('axios')

const save = data => {
  const action = data._rev ? 'update' : ''

  return axios({
    method: 'post',
    url: `/api/v1/${data.docType}/${action}`,
    data
  })
}

module.exports = {save}
