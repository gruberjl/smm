const React = require('react')
const {Channel} = require('./channel.js')
const {Workflows} = require('./workflows.js')

const Main = (props) => {
  const arrLocation = props.locationHash.split('/')
  const root = arrLocation[0]

  if (root == 'channel') {
    return <Channel {...props}/>
  } else if (root == 'workflows') {
    return <Workflows {...props}/>
  }

  return <main/>
}

module.exports = {Main}
