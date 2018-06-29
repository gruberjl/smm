const React = require('react')
const {Route} = require('react-router-dom')
const {ConnectorsEditLanding} = require('./landing.js')
const {ConnectorsEdit} = require('./edit.page.js')

const Connectors = () => (
  <div>
    <Route path="/connectors" exact component={ConnectorsEditLanding} />
    <Route path="/connectors/:persistence(edit)/:_id" component={ConnectorsEdit} />
    <Route path="/connectors/:persistence(new)" component={ConnectorsEdit} />
  </div>
)

module.exports = {Connectors}
