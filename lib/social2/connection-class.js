class Connection {
  constructor(connector, account) {
    this.connector = connector
    this.account = account
    this.workflows = []
    this.channels = []
  }

  get _id() {
    return this.connector._id
  }

  get _deleted() {
    return Boolean(this.connector._deleted)
  }

  get token() {
    return this.account.token
  }

  get tokenSecret() {
    return this.account.tokenSecret
  }

  updateChannel(channel) {
    const idx = this.channels.findIndex(d => d._id == channel._id)
    if (idx > -1)
      this.channels.splice(idx, 1, channel)
    else
      this.channels.push(channel)
  }

  updateWorkflow(workflow) {
    const idx = this.workflows.findIndex(d => d._id == workflow._id)
    if (idx > -1)
      this.workflows.splice(idx, 1, workflow)
    else
      this.workflows.push(workflow)
  }

  updateConnector(connector) {
    this.connector = connector
  }

  updateDoc(doc) {
    const type = doc.docType
    if (type == 'channel')
      this.updateChannel(doc)
    else if (type == 'workflow')
      this.updateWorkflow(doc)
    else if (type == 'connector')
      this.updateConnector(doc)
  }

  getWaitingWorkflows() {
    const now = (new Date()).getTime()

    const waitingWorkflows = this.workflows
      .filter(workflow => workflow.nextRun < now)
      .sort((a, b) => {
        if (a.nextRun < b.nextRun) return -1
        if (a.nextRun == b.nextRun) return 0
        return 1
      })

    return waitingWorkflows
  }
}

module.exports = {Connection}
