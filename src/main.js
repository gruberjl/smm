const React = require('react')

const filterMessagesByChannel = (channel, messages) => {
  const filteredMessages = messages.filter(
    (msg) => msg.workflow.channel == channel
  )

  return filteredMessages
}

const MessageCard = ({message}) => (
  <div className="message-card stack margins padding">
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

class Main extends React.Component {
  render() {
    let domMessages = []
    if (this.props.locationHash.split('/')[0] == 'channel') {
      const currentChannel = this.props.locationHash.split('/')[1]
      const filteredMessages = filterMessagesByChannel(currentChannel, this.props.messages)
      domMessages = filteredMessages.map((msg) => (
        <MessageCard message={msg} key={msg.id}/>
      ))
    }

    return (
      <main id="messages-container">
        {domMessages}
      </main>
    )
  }
}

module.exports = {Main}
