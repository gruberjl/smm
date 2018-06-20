const {getDb, read, update, create, destroy} = require('./index.js')

describe('db', () => {
  let db
  beforeAll(async () => {
    db = await getDb()
  })

  describe('getDb', () => {
    test('should be mongodb', async () => {
      expect(db.databaseName).toBe('db')
    })
  })

  describe('read', () => {
    test('should seed workspace', async () => {
      const workspace = await read({collection:'workspaces', query:{}, limit:1})
      expect(workspace[0]).toBeDefined()
    })
  })

  describe('update', () => {
    test('should update workspace', async () => {
      const workspace = (await read({collection:'workspaces', query:{}, limit:1}))[0]
      const data = {
        _id:workspace._id,
        connectors: { twitterGruberjl: {platform:'new'} }
      }
      const response = await update({collection:'workspaces', data})
      expect(response.result.ok).toEqual(1)
    })
  })

  describe('create', () => {
    test('should create item', async () => {
      const response = await create({collection:'workspaces', data:{a:1}})
      expect(response.result.ok).toEqual(1)
    })
  })

  describe('destroy', () => {
    test('should destroy item', async () => {
      const workspace = (await read({collection:'workspaces', query:{}, limit:1}))[0]
      const response = await destroy({collection:'workspaces', query:{_id:workspace._id}})
      expect(response.result.ok).toEqual(1)
    })
  })
})
