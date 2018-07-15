/* eslint indent: 0 */
jest.mock('../../provider')
const p = require('../../provider')
p.submit = jest.fn(() => ({status:200}))
jest.mock('../../database/server')
const s = require('../../database/server')

const request = require('supertest')
const {app} = require('../index.js')
const {get, put} = require('../../database/server')

describe('express:api:interactions', () => {
  beforeAll(async () => {
    await put('workspace1', {_id:'c1', account:'a1'})
    await put('accounts', {_id:'a1', token:'t1', tokenSecret:'ts1'})
  })

  describe('create', () => {
    test('should create interactions', (done) => {
      const interaction = {_id: 'c', provider:'twitter', docType:'like', providerId:'p1', connector:{_id:'c1'}}
      request(app).post('/api/v1/interaction').send(interaction)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(res => {
          expect(res.body._id).toEqual('c')
          expect(res.body._rev).toBeDefined()
        })
        .end((err) => {
          if (err) return done(err)
          done()
        })
    })

    test('should hit db', () => {
      expect(p.submit.mock.calls.length).toEqual(1)
      expect(p.submit.mock.calls[0]).toEqual(['twitter', 'like', 't1', 'ts1', 'p1'])
    })

    test('should create doc in interactions', async () => {
      const doc = await get('interactions1', 'c')
      expect(doc._id).toEqual('c')
    })
  })
})
