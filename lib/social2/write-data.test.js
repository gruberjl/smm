const db = require('../database/server')
db.bulkDocs = jest.fn(() => Promise.resolve({ok:true}))
const {writeData} = require('./write-data')

describe('social:write-data', () => {
  beforeEach(() => {
    db.bulkDocs.mockClear()
  })

  describe('no messages', () => {
    test('should not error', async () => {
      await writeData([], [])
      expect(db.bulkDocs.mock.calls.length).toEqual(0)
    })
  })

  describe.only('multiple messages', () => {
    let workspaceDocs, messages

    beforeEach(() => {
      workspaceDocs = [
        {_id:'a', channel:'c', docType:'workflow'},
        {_id:'b', channel:'d', docType:'workflow'},
        {_id:'c', dbName:'db1'},
        {_id:'d', dbName:'db2'},
      ]

      messages = [
        {workflow:{_id:'a'}, _id:'m1'},
        {workflow:{_id:'b'}, _id:'m2'},
        {workflow:{_id:'b'}, _id:'m3'},
      ]
    })

    test('should write to database', async () => {
      await writeData(workspaceDocs, messages)
      expect(db.bulkDocs.mock.calls.length).toEqual(2)
    })
  })
})
