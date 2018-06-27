const React = require('react')
const {connect} = require('react-redux')
const {Link} = require('react-router-dom')

const ChannelNavLink = ({id, name}) => (
  <div><Link to={`/channel/${id}`}>{name}</Link></div>
)

const Component = ({channels}) => {
  const ChannelComponents = channels.map(
    (channel) => <ChannelNavLink id={channel.id} name={channel.name} key={channel.id}/>
  )

  return (
    <aside id="left-nav" className="no-margin padding">
      <h4 className="light no-margin">channels</h4>
      <div id="channels-container left-padding">{ChannelComponents}</div>
    </aside>
  )
}

const mapStateToProps = (state) => {
  const channels = Object.keys(state.workspace.channels).map((key) => state.workspace.channels[key])

  return {channels}
}

const LeftNav = connect(mapStateToProps)(Component)

module.exports = {LeftNav}
