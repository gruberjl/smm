/* eslint indent: 0 */
jest.mock('./run-cycle')
const RunCycle = require('./run-cycle')

const {push, get} = require('./workspaces')
const {workspaceDoc} = require('../mock-docs/simple-workspace')

describe('social', () => {
describe('workspaces:push', () => {
  const runCycle = RunCycle.runCycle.mockImplementation()

  beforeEach(() => {
    runCycle.mockClear()
  })

  test('should add workspaceDoc', () => {
    push({workspaceDoc})
    const workspaces = get()
    expect(workspaces.length).toEqual(1)
    expect(workspaces[0].workspaceDoc).toEqual(workspaceDoc)
    expect(runCycle.mock.calls.length).toEqual(1)
  })

  test('should replace workspaceDoc', () => {
    push({workspaceDoc})
    runCycle.mockClear()
    push({workspaceDoc: Object.assign({a:1}, workspaceDoc)})
    const workspaces = get()
    expect(workspaces.length).toEqual(1)
    expect(workspaces[0].workspaceDoc.a).toEqual(1)
    expect(runCycle.mock.calls.length).toEqual(1)
  })
})
})
