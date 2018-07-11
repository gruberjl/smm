const React = require('react')

const ShareButton = ({shareCount}) => (
  <button className="message-action">
    <img className="message-action-icon" src="/assets/fa/advanced-options/raw-svg/solid/share.svg"/>
    <span className="message-action-text">Share</span>
    <span className="light side-margins">{shareCount}</span>
  </button>
)

module.exports = {ShareButton}
