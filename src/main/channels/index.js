const React = require('react')
const {Route} = require('react-router-dom')
const {ChannelsLanding} = require('./landing.js')
const {ChannelsEdit} = require('./edit.page.js')

const Channels = () => (
  <div>
    <Route path="/channels" exact component={ChannelsLanding} />
    <Route path="/channels/:persistence(edit)/:_id" component={ChannelsEdit} />
    <Route path="/channels/:persistence(new)" component={ChannelsEdit} />
  </div>
)

module.exports = {Channels}
