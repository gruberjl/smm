const React = require('react')
const {connect} = require('react-redux')
const {Link, withRouter} = require('react-router-dom')

class Channel extends React.Component {
  editChannel(_id) {
    return () => {
      this.props.history.push(`/channels/edit/${_id}`)
    }
  }

  render() {
    const channel = this.props.channel
    return (<div className="card stack margins padding link" onClick={this.editChannel(channel._id)}>
      <div>
        <label>_id: </label>
        <span>{channel._id}</span>
      </div>
      <div>
        <label>Name: </label>
        <span>{channel.name}</span>
      </div>
    </div>)
  }
}

const Component = ({channels, history}) => {
  const channelElements = channels.map(
    (channel) => <Channel channel={channel} key={channel._id} history={history}/>
  )

  return <main id="channels-landing-container">
    <div className="space-between align-center side-margins">
      <h1>Channels</h1>
      <div>
        <Link to="/channels/new" className="space-around align-center no-style">
          <img src="/assets/fa/advanced-options/raw-svg/solid/plus.svg" width="28px" height="28px"/>
          <span className="side-padding">New Channel</span>
        </Link>
      </div>
    </div>
    {channelElements}
  </main>
}

const mapStateToProps = (state) => ({channels: state.workspace.channels})

const ChannelsLanding = withRouter(connect(mapStateToProps)(Component))

module.exports = {ChannelsLanding}
