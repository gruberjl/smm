const React = require('react')
const {Channel} = require('./channel.js')
const {Workflows} = require('./workflows/index.js')
const {Channels} = require('./channels/index.js')
const {Connectors} = require('./connectors/index.js')

const Main = (props) => {
  const arrLocation = props.locationHash.split('/')
  const root = arrLocation[0]

  if (root == 'channel') {
    return <Channel {...props}/>
  } else if (root == 'workflows') {
    return <Workflows {...props}/>
  } else if (root == 'channels') {
    return <Channels {...props}/>
  } else if (root == 'connectors') {
    return <Connectors {...props}/>
  }

  return <main/>
}

module.exports = {Main}
