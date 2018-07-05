const React = require('react')
const {connect} = require('react-redux')
const {withRouter} = require('react-router-dom')
const {api} = require('../../lib/index.js')
const {ChannelEditCard} = require('./edit-card.js')
const templates = require('../../lib/templates')

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
    api.workspaces.saveItem('workspace1', this.state.channel, 'channels')
  }

  deleteChannel() {
    api.workspaces
      .deleteItem('workspace1', this.state.channel, 'channels')
      .then((res) => {
        if (res.status)
          this.props.history.push('/channels')
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
  const params = props.match.params

  const isNew = params.persistence == 'new'
  const initialChannel = isNew ?
    templates.channel() :
    state.workspace.channels.find((channel) => channel._id == params._id)
  const workspace = state.workspace

  return {isNew, initialChannel, workspace}
}

const ChannelsEdit = withRouter(connect(mapStateToProps)(Component))

module.exports = {ChannelsEdit}