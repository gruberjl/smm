const {redis, workspaces} = require('./index.js')
const seed = require('./seed.js')
const quit = require('./quit.js')
const {create} = require('./create.js')

const start = async () => {
  await seed.flushDb(redis)
  await seed.db(redis)
  await workspaces.create(seed.workspace)
  await create(seed.account)
  quit.all()
}

start()
