/* eslint indent: 0 */
const request = require('supertest')
const {app} = require('../index.js')
const {get} = require('../../database/server')

describe('express:api', () => {
describe('channel', () => {
  describe('create', () => {
    test('should create channel', (done) => {
      request(app).post('/api/v1/channel').send({_id: 'a'})
        .set('Accept', 'application/json')
        .expect(200)
        .expect(res => {
          expect(res.body._id).toEqual('a')
          expect(res.body._rev).toBeDefined()
          expect(res.body.dbName).toBeDefined()
        })
        .end((err) => {
          if (err) return done(err)
          done()
        })
    })

    test('should create doc in workspace', async () => {
      const doc = await get('workspace1', 'a')
      expect(doc._id).toEqual('a')
    })
  })
})
describe('workflow', () => {
  describe('create', () => {
    test('should create workflow', (done) => {
      request(app).post('/api/v1/workflow').send({_id: 'b'})
        .set('Accept', 'application/json')
        .expect(200)
        .expect(res => {
          expect(res.body._id).toEqual('b')
          expect(res.body._rev).toBeDefined()
        })
        .end((err) => {
          if (err) return done(err)
          done()
        })
    })

    test('should create doc in workspace', async () => {
      const doc = await get('workspace1', 'b')
      expect(doc._id).toEqual('b')
    })
  })
})

describe('interactions', () => {
  describe('create', () => {
    test('should create interactions', (done) => {
      request(app).post('/api/v1/interaction').send({_id: 'c'})
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

    test('should create doc in interactions', async () => {
      const doc = await get('interactions1', 'c')
      expect(doc._id).toEqual('c')
    })
  })
})
})
