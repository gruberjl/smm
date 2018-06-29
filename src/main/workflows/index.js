const React = require('react')
const {Route} = require('react-router-dom')
const {WorkflowsLanding} = require('./landing.js')
const {WorkflowsEdit} = require('./edit.page.js')

const Workflows = () => (
  <div>
    <Route path="/workflows" exact component={WorkflowsLanding} />
    <Route path="/workflows/:persistence(edit)/:_id" component={WorkflowsEdit} />
    <Route path="/workflows/:persistence(new)" component={WorkflowsEdit} />
  </div>
)

module.exports = {Workflows}
