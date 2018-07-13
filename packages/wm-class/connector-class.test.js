/* eslint indent: 0 */
const {Connector} = require('./connector-class')

describe('Connector', () => {
describe('constructor', () => {
  test('should return Connector', () => {
    expect(typeof Connector).toEqual('function')
    expect(new Connector()).toBeInstanceOf(Connector)
  })

  test('should set doc', () => {
    const c = new Connector({a:1}, {})
    expect(c.doc).toEqual({a:1})
  })

  test('should set account', async () => {
    const c = new Connector({}, {b:1})
    const a = await c.account
    expect(a).toEqual({b:1})
  })
})
})
