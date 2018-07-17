const newConnection = (connection) => ({
  _id: connection._id,
  updateWorkflow: jest.fn(),
  updateConnector: jest.fn(),
  updateChannel: jest.fn()
})

module.exports = {newConnection}
