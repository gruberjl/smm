const {redis, workspaces, redisSocket, quit} = require('./index.js')
const seed = require('./seed.js')

describe('db', () => {
  beforeAll(async () => {
    await seed.flushDb(redis)
    redisSocket.unsubscribe()
  })
  beforeEach(async () => seed.db(redis))
  afterEach(async () => seed.flushDb(redis))
  afterAll(() => {
    redisSocket.subscribe()
    quit.all()
  })

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
    beforeEach(async () => workspaces.create(seed.workspace))

    describe('read', () => {
      test('should get workspace', async () => {
        const workspace = await workspaces.read(seed.workspace.id)
        expect(typeof workspace).toEqual('object')
        expect(workspace).toEqual(seed.workspace)
      })
    })

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
        const next = jest.fn()
        const req = {params: {id: seed.workspace.id}}
        await workspaces.get(req, {}, next)
        expect(req.db).toBeDefined()
        expect(Array.isArray(req.db.raw)).toEqual(true)
        expect(Array.isArray(req.db.raw[0])).toEqual(true)
        expect(req.db.raw[0][0]).toEqual(null)
        expect(typeof req.db.raw[0][1]).toEqual('object')
        expect(next.mock.calls.length).toEqual(1)
      })
    })

    describe('update', () => {
      let next, req
      beforeEach(async () => {
        await workspaces.create(seed.workspace)
        next = jest.fn()
        req = {params: {id: seed.workspace.id, table:'connectors'}}
      })

      test('should update value', async () => {
        req.body = {connectors:{twitterGruberjl:{platform:'new'}}}
        await workspaces.update(req, {}, next)
        expect(req.db).toBeDefined()
        expect(req.db.raw[0][0]).toEqual(null)
        expect(req.db.raw[0][1]).toEqual('OK')
        expect(req.db.raw[1][0]).toEqual(null)
        expect(typeof req.db.raw[1][1]).toEqual('object')
        expect(next.mock.calls.length).toEqual(1)
      })

      test('should emit WORKSPACE_UPDATED', (done) => {
        redisSocket.subscribe()

        redisSocket.on('WORKSPACE_UPDATED', (data) => {
          expect(data.id).toEqual(seed.workspace.id)
          redisSocket.unsubscribe()
          done()
        })

        req.body = {connectors:{twitterGruberjl:{platform:'new'}}}
        workspaces.update(req, {}, next)
      })

      test('should add nested items', async () => {
        req.body = {connectors:{a:{id:'a', b:'new'}}}
        await workspaces.update(req, {}, next)
        expect(req.db).toBeDefined()
        expect(req.db.raw[0][0]).toEqual(null)
        expect(req.db.raw[0][1]).toEqual('OK')
        expect(req.db.raw[1][0]).toEqual(null)
        expect(typeof req.db.raw[1][1]).toEqual('object')
        expect(next.mock.calls.length).toEqual(1)
      })

      test('should remove a nested item', async () => {
        req.body = {connectors:{twitterGruberjl:null}}
        await workspaces.update(req, {}, next)
        expect(req.db).toBeDefined()
        expect(req.db.raw[0][0]).toEqual(null)
        expect(req.db.raw[0][1]).toEqual(4)
        expect(req.db.raw[1][0]).toEqual(null)
        expect(typeof req.db.raw[1][1]).toEqual('object')
        expect(next.mock.calls.length).toEqual(1)
      })
    })
  })
})
