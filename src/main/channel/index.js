const React = require('react')
const {connect} = require('react-redux')
const {withRouter} = require('react-router-dom')
const channelDb = require('../../lib/channelDb.js')
const {MessageCard} = require('./message-card')

class Component extends React.Component {
  componentDidMount() {
    channelDb.start(this.props.channel.dbName)
  }

  componentWillUnmount() {
    channelDb.stop(this.props.channel.dbName)
  }

  render() {
    return (
      <main id="messages-container">
        {this.props.messages.map((message) => (
          <MessageCard message={message} key={message._id}/>
        ))}
      </main>
    )
  }
}

const mapStateToProps = (state, props) => {
  const params = props.match.params
  const channel = state.workspace.channels.find((channel) => channel._id == params._id)
  const messages = state.channelDbs[channel.dbName].messages

  return {channel, messages}
}

const Channel = withRouter(connect(mapStateToProps)(Component))

module.exports = {Channel}
