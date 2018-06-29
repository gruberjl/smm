const React = require('react')

class ChannelEditCard extends React.Component {
  handleChange(event) {
    const channel = Object.assign({}, this.props.channel)
    channel[event.target.name] = event.target.value
    this.props.onChange(channel)
  }

  render() {
    const channel = this.props.channel
    return <div id="channel-edit-card" className="card margins padding">
      <div>
        <label>ID: </label>
        <span>{channel._id}</span>
      </div>
      <div>
        <input type="text" placeholder="Channel Name" value={channel.name || ''} onChange={this.handleChange.bind(this)} name="name"/>
      </div>
      {JSON.stringify(channel)}
    </div>
  }
}

module.exports = {ChannelEditCard}
