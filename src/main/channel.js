const React = require('react')
const {connect} = require('react-redux')
const {withRouter} = require('react-router-dom')

const filterMessagesByChannel = (channel, messages) => {
  const filteredMessages = messages.filter(
    (msg) => msg.workflow.channel == channel
  )

  return filteredMessages
}

const MessageCard = ({message}) => (
  <div className="card message-card stack margins padding">
    <header className="message-card-header">
      <div className="message-from-image-container">
        <img className="message-from-image" src={message.event.from.image} />
        <img className="message-from-platform" src="/assets/fa/advanced-options/raw-svg/brands/twitter.svg"/>
      </div>
      <span className="message-from-display-name fw600 side-margins">{message.event.from.displayName}</span>
    </header>
    <div className="message-text">{message.event.message}</div>
    <footer>
      <div className="message-action-container">
        <button className="message-action">
          <img className="message-action-icon" src="/assets/fa/advanced-options/raw-svg/solid/thumbs-up.svg"/>
          <span className="message-action-text">Like</span>
        </button>
        <button className="message-action side-margins">
          <img className="message-action-icon" src="/assets/fa/advanced-options/raw-svg/solid/comment.svg"/>
          <span className="message-action-text">Comment</span>
        </button>
        <button className="message-action">
          <img className="message-action-icon" src="/assets/fa/advanced-options/raw-svg/solid/share.svg"/>
          <span className="message-action-text">Share</span>
        </button>
      </div>
    </footer>
  </div>
)

const Component = ({messages}) => {
  return (
    <main id="messages-container">
      {messages.map((message) => (
        <MessageCard message={message} key={message.id}/>
      ))}
    </main>
  )
}

const mapStateToProps = (state, props) => {
  const params = props.match.params
  const workspace = state.workspace
  const channel = workspace.channels[params.id]
  const messages = state.messages.all.filter(message => message.workflow.channel == channel.id)

  return {channel, workspace, messages}
}

const Channel = withRouter(connect(mapStateToProps)(Component))

module.exports = {Channel}
