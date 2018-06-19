const React = require('react')

class ChannelEditCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, {channel: props.channel})
  }

  handleChange(event) {
    const channel = Object.assign({}, this.state.channel)
    channel[event.target.name] = event.target.value
    this.setState({channel})
  }

  render() {
    const channel = this.state.channel
    return <div id="channel-edit-card" className="card margins padding">
      <div>
        <label>ID: </label>
        <span>{channel.id}</span>
      </div>
      <div>
        <input type="text" placeholder="Channel Name" value={channel.name} onChange={this.handleChange.bind(this)} name="name"/>
      </div>
      {JSON.stringify(channel)}
    </div>
  }
}

module.exports = {ChannelEditCard}
