const React = require('react')
const {ConnectorsEditLanding} = require('./landing.js')
const {ConnectorsEdit} = require('./edit.js')

const Connectors = (props) => {
  const arrLocation = props.locationHash.split('/')

  if (arrLocation.length > 1 && (arrLocation[1] == 'edit' || arrLocation[1] == 'new')) {
    return <ConnectorsEdit {...props}/>
  }

  return <ConnectorsEditLanding {...props}/>
}

module.exports = {Connectors}
