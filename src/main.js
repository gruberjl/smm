const React = require('react')

const filterMessagesByChannel = (channel, messages) => {
  const filteredMessages = messages.filter(
    (msg) => msg.workflow.channel == channel
  )

  return filteredMessages
}

const MessageCard = ({message}) => (
  <div className="message-card stack margins padding">
    <header className="message-card-header columnar">
      <span className="message-from-display-name fw600">{message.event.from.displayName}</span>
      <span className="message-from-account light">{message.event.from.account}</span>
    </header>
    <div className="message-text">{message.event.message}</div>
    <footer></footer>
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
