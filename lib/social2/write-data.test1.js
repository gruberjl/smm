const {writeData} = require('./write-data')
const {bulkDocs} = require('../database/server')

describe('social:write-data', () => {
  describe('no messages', () => {
    test('should not error', async () => {
      await writeData([])
      expect(bulkDocs.mock.calls.length).toEqual(1)
    })
  })

  describe('multiple messages', () => {
    await writeData([

    ])
    expect(bulkDocs.mock.calls.length).toEqual(2)
  })
})
