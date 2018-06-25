const React = require('react')
const {WorkflowsLanding} = require('./landing.js')
const {WorkflowsEdit} = require('./edit.js')

const Workflows = (props) => {
  const arrLocation = props.locationHash.split('/')

  if (arrLocation.length > 1 && (arrLocation[1] == 'edit' || arrLocation[1] == 'new')) {
    return <WorkflowsEdit {...props}/>
  }

  return <WorkflowsLanding {...props}/>
}

module.exports = {Workflows}
