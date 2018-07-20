const db = require('../database/server')
db.bulkDocs = jest.fn(() => Promise.resolve({ok:true}))
const {writeData} = require('./write-data')

describe('social:write-data', () => {
  beforeEach(() => {
    db.bulkDocs.mockClear()
  })

  describe('no messages', () => {
    test('should not error', async () => {
      await writeData({dbMap:{}}, [])
      expect(db.bulkDocs.mock.calls.length).toEqual(0)
    })
  })

  describe('multiple messages', () => {
    let dbMap, messages

    beforeEach(() => {
      dbMap = { a:'db1', b:'db2' }

      messages = [
        {workflow:{_id:'a'}, _id:'m1'},
        {workflow:{_id:'b'}, _id:'m2'},
        {workflow:{_id:'b'}, _id:'m3'},
      ]
    })

    test('should write to database', async () => {
      await writeData({dbMap}, messages)
      expect(db.bulkDocs.mock.calls.length).toEqual(2)
    })
  })
})
