const {allDocs} = require('./lib/database/server')

const start = async () => {
  let docs = await allDocs('channel0', {limit:3, descending: true})
  docs.map(doc => `${doc._id}  ${doc.time}`)
    .forEach(m => console.log(m))

  console.log('')
  console.log(docs[docs.length-1]._id)
  docs = await allDocs('channel0', {limit:3, descending: true, skip:1, startkey:docs[docs.length-1]._id})
  docs.map(doc => `${doc._id}  ${doc.time}`)
    .forEach(m => console.log(m))

  console.log('')
  console.log(docs[docs.length-1]._id)
  docs = await allDocs('channel0', {limit:3, descending: true, skip:1, startkey:docs[docs.length-1]._id})
  docs.map(doc => `${doc._id}  ${doc.time}`)
    .forEach(m => console.log(m))
}

start()


// newest: twitter:1021096821060513793  2018-07-22T18:17:07.000Z
// oldest: twitter:1020862267317944320  2018-07-22T02:45:05.000Z
