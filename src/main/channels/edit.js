const React = require('react')
const {connect} = require('react-redux')
const {api} = require('../../lib/index.js')
const {ChannelEditCard} = require('./edit-card.js')

class Component extends React.Component {
  constructor(props) {
    super(props)

    const channel = Object.assign({}, props.initialChannel)

    this.state = {channel}
  }

  channelChanged(channel) {
    this.setState({channel})
  }

  saveChannel() {
    api.workspaces.saveItem(this.props.workspace.id, this.state.channel, 'channels')
  }

  deleteChannel() {
    api.workspaces
      .deleteItem(this.props.workspace.id, this.state.channel.id, 'channels')
      .then((res) => {
        if (res.status)
          window.location = '#channels'
      })
  }

  render() {
    const channel = this.state.channel
    const headerText = this.props.isNew ? 'Create New Channel' : `Edit Channel: ${this.props.initialChannel.name}`

    return <main id="channels-edit-container">
      <header className="side-margins">
        <h1>{headerText}</h1>
      </header>
      <ChannelEditCard {...this.props} channel={channel} onChange={this.channelChanged.bind(this)}/>
      <footer className="space-between side-margins">
        <div>
          <button onClick={this.deleteChannel.bind(this)}>Delete</button>
        </div>
        <div>
          <button onClick={this.saveChannel.bind(this)}>Save</button>
        </div>
      </footer>
    </main>
  }
}

const mapStateToProps = (state, props) => {
  const arrLocation = props.locationHash.split('/')

  const isNew = arrLocation[1] == 'new'
  const initialChannel = isNew ? {} : state.workspace.channels[arrLocation[2]]
  const workspace = state.workspace

  return {isNew, initialChannel, workspace}
}

const ChannelsEdit = connect(mapStateToProps)(Component)

module.exports = {ChannelsEdit}
