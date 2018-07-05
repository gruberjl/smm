const React = require('react')

const MessageCard = ({message}) => (
  <div className="card message-card stack margins padding">
    <header className="message-card-header">
      <div className="message-from-image-container">
        <img className="message-from-image" src={message.from.image} />
        <img className="message-from-platform" src="/assets/fa/advanced-options/raw-svg/brands/twitter.svg"/>
      </div>
      <span className="message-from-display-name fw600 side-margins">{message.from.displayName}</span>
    </header>
    <div className="message-text">{message.message}</div>
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

module.exports = {MessageCard}
