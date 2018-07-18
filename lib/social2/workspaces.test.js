const {add, getConnections, filterNewConnectors, workspaces, getData} = require('./workspaces')

jest.mock('./new-connection')

describe('social:workspaces', () => {
  let doc, docs, accounts

  beforeEach(() => {
    doc = {_id:'a'}
    docs = [
      {_id:'b', docType:'channel'},
      {_id:'c', docType:'workflow', connector:'d'},
      {_id:'d', docType:'connector', account:'e'}
    ]
    accounts = [
      {_id:'e'}
    ]
    Object.keys(workspaces).forEach(key => delete workspaces[key])
  })

  describe('add', () => {
    describe('new workspace', () => {
      test('should add workspace', () => {
        add(doc, docs, accounts)
        expect(Object.keys(workspaces).length).toEqual(1)
        expect(workspaces.a._id).toEqual('a')
        expect(workspaces.a.workspaceDoc).toEqual(doc)
        expect(Object.keys(workspaces.a.connections)).toEqual(['d'])
        expect(workspaces.a.connections.d.updateWorkflow.mock.calls.length).toEqual(1)
        expect(workspaces.a.connections.d.updateWorkflow.mock.calls[0]).toEqual([docs[1]])
        expect(workspaces.a.connections.d.updateChannel.mock.calls.length).toEqual(1)
        expect(workspaces.a.connections.d.updateChannel.mock.calls[0]).toEqual([docs[0]])
      })
    })

    describe('existing workspace', () => {
      test('should update workspace', () => {
        add(doc, [], [])
        add(doc, docs, accounts)
        expect(Object.keys(workspaces).length).toEqual(1)
        expect(workspaces.a._id).toEqual('a')
        expect(workspaces.a.workspaceDoc).toEqual(doc)
        expect(Object.keys(workspaces.a.connections)).toEqual(['d'])
        expect(workspaces.a.connections.d.updateWorkflow.mock.calls.length).toEqual(1)
        expect(workspaces.a.connections.d.updateWorkflow.mock.calls[0]).toEqual([docs[1]])
        expect(workspaces.a.connections.d.updateChannel.mock.calls.length).toEqual(1)
        expect(workspaces.a.connections.d.updateChannel.mock.calls[0]).toEqual([docs[0]])
      })
    })
  })

  describe('getConnections', () => {
    test('should return connections', () => {
      add(doc, docs, accounts)
      add(Object.assign(doc, {_id:'f'}), docs, accounts)
      expect(getConnections().length).toEqual(2)
    })
  })

  describe('filterNewConnectors', () => {
    test('should filter', () => {
      add(doc, docs, accounts)
      const r = filterNewConnectors(doc, [docs[2], {docType:'workflow'}, {docType:'connector', _id:'aa'}])
      expect(r).toEqual([{'_id': 'aa', 'docType': 'connector'}])
    })
  })

  describe('getData', () => {
    test('no messages', async () => {
      add(doc, docs, accounts)
      workspaces.a.connections.d.getData = jest.fn(() => Promise.resolve([]))
      const data = await getData()
      expect(workspaces.a.connections.d.getData.mock.calls.length).toEqual(1)
      expect(data.length).toEqual(1)
      expect(data[0].messages).toBeDefined()
      expect(data[0].workspace).toEqual(workspaces.a)
    })

    test('Returned messages', async () => {
      add(doc, docs, accounts)
      add(Object.assign(doc, {_id:'b'}), docs.slice(), accounts)
      workspaces.a.connections.d.getData = jest.fn().mockResolvedValue([{c:1}])
      workspaces.b.connections.d.getData = jest.fn().mockResolvedValue([{d:1}])
      const data = await getData()
      expect(workspaces.a.connections.d.getData.mock.calls.length).toEqual(1)
      expect(workspaces.b.connections.d.getData.mock.calls.length).toEqual(1)
      expect(data.length).toEqual(2)
      expect(data[0].messages).toEqual([{c:1}])
      expect(data[1].messages).toEqual([{d:1}])
    })
  })
})
