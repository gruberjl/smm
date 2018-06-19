const React = require('react')
const {ChannelsLanding} = require('./landing.js')
const {ChannelsEdit} = require('./edit.js')

const Channels = (props) => {
  const arrLocation = props.locationHash.split('/')

  if (arrLocation.length > 1 && arrLocation[1] == 'edit') {
    return <ChannelsEdit {...props}/>
  }

  return <ChannelsLanding {...props}/>
}

module.exports = {Channels}
