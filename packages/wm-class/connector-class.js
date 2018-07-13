class Connector {
  constructor(doc, account) {
    this.doc = doc
    this.account = Promise.resolve(account)
  }
}

module.exports = {Connector}
