const {watchDb, put} = require('../database/server')

const filterReadyToSubmit = (docs) => docs.filter(doc =>
  !doc.submitted
)

watchDb('interactions1').on('change', (docs) => {
  const readyToSubmit = filterReadyToSubmit(docs)
  console.log(readyToSubmit)
})

put('interactions1', {
  _id: '7a60d3bc896a96faf22f680e35005fb8',
  provider: 'twitter',
  providerId: '1016866118017810433',
  messageId: 'twitter:1016866118017810433',
  docType: 'like'
})
