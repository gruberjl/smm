const React = require('react')
const {connect} = require('react-redux')

class Channel extends React.Component {
  editChannel(id) {
    return () => {
      window.location = `#channels/edit/${id}`
    }
  }

  render() {
    const channel = this.props.channel
    return (<div className="card stack margins padding link" onClick={this.editChannel(channel.id)}>
      <div>
        <label>Id: </label>
        <span>{channel.id}</span>
      </div>
      <div>
        <label>Name: </label>
        <span>{channel.name}</span>
      </div>
    </div>)
  }
}

const Component = ({channels}) => {
  const channelElements = channels.map(
    (channel) => <Channel channel={channel} key={channel.id}/>
  )

  return <main id="channels-landing-container">
    <div className="space-between align-center side-margins">
      <h1>Channels</h1>
      <div>
        <a href="#channels/new" className="space-around align-center no-style">
          <img src="/assets/fa/advanced-options/raw-svg/solid/plus.svg" width="28px" height="28px"/>
          <span className="side-padding">New Channel</span>
        </a>
      </div>
    </div>
    {channelElements}
  </main>
}

const mapStateToProps = (state) => {
  const channels = Object.keys(state.workspace.channels).map((key) => state.workspace.channels[key])

  return {channels}
}

const ChannelsLanding = connect(mapStateToProps)(Component)

module.exports = {ChannelsLanding}
