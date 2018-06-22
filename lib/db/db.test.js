const {redis, workspaces} = require('./index.js')
const seed = require('./seed.js')

describe('db', () => {
  beforeAll(async () => seed.flushDb(redis))
  beforeEach(async () => seed.db(redis))
  afterEach(async () => seed.flushDb(redis))
  afterAll(async () => redis.quit())

  describe('redis', () => {
    test('should set db to 1', () => {
      expect(redis.options.db).toEqual(1)
    })

    test('should have next_id set as integer', async () => {
      const nextId = await redis.get('next_id')
      expect(nextId).toEqual('0')
    })

    test('should INCR next_id', async () => {
      const nextId = await redis.incr('next_id')
      expect(nextId).toEqual(1)
    })
  })

  describe('workspaces', () => {
    describe('create', () => {
      test('should create', async () => {
        const results = await workspaces.create(seed.workspace)
        expect(results.statusCode).toEqual(200)
        expect(results.raw).toEqual('OK')
      })
    })

    describe('get', () => {
      beforeEach(async () => workspaces.create(seed.workspace))

      test('should get', async () => {
        const results = await workspaces.get(seed.workspace.id)
        expect(results.statusCode).toEqual(200)
        expect(typeof results.data).toEqual('object')
        expect(typeof results.raw).toEqual('object')
      })
    })

    describe('update', () => {
      beforeEach(async () => workspaces.create(seed.workspace))

      test('should update value', async () => {
        const val = {connectors:{twitterGruberjl:{platform:'new'}}}
        const results = await workspaces.update(seed.workspace.id, val)
        expect(results.statusCode).toEqual(200)
        expect(results.data.connectors.twitterGruberjl.platform).toEqual('new')
      })

      test('should add nested items', async () => {
        const val = {connectors:{a:{id:'a', b:'new'}}}
        const results = await workspaces.update(seed.workspace.id, val)
        expect(results.statusCode).toEqual(200)
        expect(results.data.connectors.a.id).toEqual('a')
        expect(results.data.connectors.a.b).toEqual('new')
      })

      test('should remove a nested item', async () => {
        const results = await workspaces.update(seed.workspace.id, {connectors:{twitterGruberjl:null}})
        expect(results.statusCode).toEqual(200)
        expect(results.data.connectors).toBeUndefined()
      })
    })
  })
})
