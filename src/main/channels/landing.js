const React = require('react')

class Channel extends React.Component {
  editChannel(id) {
    return () => {
      window.history.pushState(null, null, `#channels/edit/${id}`)
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

const ChannelsLanding = ({workspace}) => {
  const channels = Object.keys(workspace.channels).map(
    (key) => Object.assign({}, workspace.channels[key], {id:key})
  )

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

module.exports = {ChannelsLanding}
