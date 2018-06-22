const React = require('react')
const {api} = require('../../lib/index.js')
const {ChannelEditCard} = require('./edit-card.js')

class ChannelsEdit extends React.Component {
  constructor(props) {
    super(props)

    const arrLocation = this.props.locationHash.split('/')
    const isNew = arrLocation[1] == 'new'
    let channel = {}
    if (!isNew)
      channel = Object.assign({}, this.props.workspace.channels[arrLocation[2]])

    this.state = {isNew, channel, initialChannel: Object.assign({}, channel)}
  }

  channelChanged(channel) {
    this.setState({channel})
  }

  saveChannel() {
    api.workspaces.update('channels', this.state.channel, this.props.workspace.id)
  }

  render() {
    const channel = this.state.channel
    const headerText = this.state.isNew ? 'Create New Channel' : `Edit Channel: ${this.state.initialChannel.name}`

    return <main id="channels-edit-container">
      <header className="side-margins">
        <h1>{headerText}</h1>
      </header>
      <ChannelEditCard {...this.props} channel={channel} onChange={this.channelChanged.bind(this)}/>
      <footer>
        <button onClick={this.saveChannel.bind(this)}>Save</button>
      </footer>
    </main>
  }
}

module.exports = {ChannelsEdit}
