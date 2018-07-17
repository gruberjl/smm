const {Connection} = require('./connection-class')
const {newWorkflow} = require('./new-workflow')

class TwitterConnection extends Connection {
  constructor(connector, account) {
    super(connector, account)
    this.searchLimits = {
      callsPerCycle: 12,
      cycleStart: (new Date()).getTime(),
      cycleLength: 60000,
      callsLeftOnCycle: 12
    }
  }

  resetLimits() {
    const now = (new Date()).getTime()
    if (this.searchLimits.cycleStart + this.searchLimits.cycleLength < now) {
      this.searchLimits.cycleStart = now
      this.searchLimits.callsLeftOnCycle = this.callsPerCycle
    }
  }

  updateSearchLimits(workflows) {
    const searchWorkflows = workflows.filter(w => w.action == 'search').slice(0, this.searchLimits.callsLeftOnCycle-1)
    this.searchLimits.callsLeftOnCycle = this.searchLimits.callsLeftOnCycle - searchWorkflows.length
    return searchWorkflows
  }

  updateLimits(workflows) {
    const filteredWorkflows = [].concat[this.updateSearchLimits(workflows)]
    return filteredWorkflows
  }

  async getData() {
    this.resetLimits()
    const workflows = this.updateLimits(this.getWaitingWorkflows())
    return workflows
  }

  updateWorkflow(workflow) {
    const w = newWorkflow('twitter', workflow, this.token, this.tokenSecret)
    super.updateWorkflow(w)
  }
}

module.exports = {TwitterConnection}
