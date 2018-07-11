const React = require('react')
const moment = require('moment')
const {LikeButton} = require('./button-like')
const {CommentButton} = require('./button-comment')
const {ShareButton} = require('./button-share')

const MessageCard = ({doc}) => (
  <div className="card message-card stack margins padding">
    <header className="message-card-header">
      <div>
        <span>workflow: </span>
        <span>{doc.workflow.name}</span>
      </div>
      <div className="message-from-image-container">
        <img className="message-from-image" src={doc.from.image} />
        <img className="message-from-platform" src="/assets/fa/advanced-options/raw-svg/brands/twitter.svg"/>
      </div>
      <span className="message-from-display-name fw600 side-margins">{doc.from.displayName}</span>
      <span className="light" title={doc.time}>{moment(doc.time).fromNow()}</span>
    </header>
    <div className="message-text">{doc.message}</div>
    <footer>
      <div className="message-action-container">
        <LikeButton favoriteCount={doc.favoriteCount} providerId={doc.providerId} messageId={doc._id}/>
        <CommentButton />
        <ShareButton shareCount={doc.shareCount}/>
      </div>
    </footer>
  </div>
)

module.exports = {MessageCard}
