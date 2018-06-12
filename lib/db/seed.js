const {workspaces} = require('./index.js')

const start = async () => {
  await workspaces.remove('gitbit')
  const results = await workspaces.create('gitbit', {
    organizationName:'GitBit',
    connectors: []
  })

  console.log(results)
}

start()
