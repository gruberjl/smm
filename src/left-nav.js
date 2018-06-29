const React = require('react')
const {connect} = require('react-redux')
const {Link} = require('react-router-dom')

const ChannelNavLink = ({_id, name}) => (
  <div><Link to={`/channel/${_id}`}>{name}</Link></div>
)

const Component = ({channels}) => {
  const ChannelComponents = channels.map(
    (channel) => <ChannelNavLink _id={channel._id} name={channel.name} key={channel._id}/>
  )

  return (
    <aside id="left-nav" className="no-margin padding">
      <h4 className="light no-margin">channels</h4>
      <div id="channels-container left-padding">{ChannelComponents}</div>
    </aside>
  )
}

const mapStateToProps = (state) => ({channels: state.workspace.channels})

const LeftNav = connect(mapStateToProps)(Component)

module.exports = {LeftNav}
