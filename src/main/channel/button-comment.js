const React = require('react')

const CommentButton = () => (
  <button className="message-action side-margins">
    <img className="message-action-icon" src="/assets/fa/advanced-options/raw-svg/solid/comment.svg"/>
    <span className="message-action-text">Comment</span>
  </button>
)

module.exports = {CommentButton}
