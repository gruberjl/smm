const React = require('react')
const {WorkflowsLanding} = require('./workflows.landing.js')
const {WorkflowsEdit} = require('./workflows.edit.js')

const Workflows = (props) => {
  const arrLocation = props.locationHash.split('/')

  if (arrLocation.length > 1 && arrLocation[1] == 'edit') {
    return <WorkflowsEdit {...props}/>
  }

  return <WorkflowsLanding {...props}/>
}

module.exports = {Workflows}
