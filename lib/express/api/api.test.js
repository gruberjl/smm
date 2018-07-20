/* eslint indent: 0 */
jest.mock('../../database/server')
const request = require('supertest')
const {app} = require('../index.js')
const {get, put} = require('../../database/server')

describe('express:api', () => {
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
        get('workspace1', 'a').then(doc => {
          expect(doc._id).toEqual('a')
          done()
        })
      })
  })

  test('should update channel', async (done) => {
    put('workspace1', {_id:'a2'}).then(itm => {
      itm.a = 1
      request(app).post('/api/v1/channel/update').send(itm)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(res => {
          expect(res.body._id).toEqual('a2')
          expect(res.body._rev).toBeDefined()
          expect(res.body.a).toEqual(1)
        })
        .end((err) => {
          if (err) return done(err)
          get('workspace1', 'a2').then(doc => {
            expect(doc.a).toEqual(1)
            done()
          })
        })
    })
  })

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
        get('workspace1', 'b').then(doc => {
          expect(doc._id).toEqual('b')
          done()
        })
      })
  })

  test('should update workflow', async (done) => {
    put('workspace1', {_id:'b2'}).then(itm => {
      itm.b = 1
      request(app).post('/api/v1/workflow/update').send(itm)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(res => {
          expect(res.body._id).toEqual('b2')
          expect(res.body._rev).toBeDefined()
          expect(res.body.b).toEqual(1)
        })
        .end((err) => {
          if (err) return done(err)
          get('workspace1', 'b2').then(doc => {
            expect(doc.b).toEqual(1)
            done()
          })
        })
    })
  })
})
