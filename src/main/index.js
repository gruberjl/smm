const React = require('react')
const {Channel} = require('./channel.js')
const {Workflows} = require('./workflows/index.js')
const {Channels} = require('./channels/index.js')
const {Connectors} = require('./connectors/index.js')
const {Landing} = require('./landing.js')
const {Route} = require('react-router-dom')

const Main = () => (
  <div className='main-container'>
    <Route path="/" exact component={Landing} />
    <Route path="/channel/:id" component={Channel} />
    <Route path="/workflows" component={Workflows} />
    <Route path="/channels" component={Channels} />
    <Route path="/connectors" component={Connectors} />
  </div>
)

module.exports = {Main}
