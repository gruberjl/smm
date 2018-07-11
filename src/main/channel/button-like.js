const React = require('react')
const {put} = require('../../lib/database')
const templates = require('../../lib/templates')

class LikeButton extends React.Component {
  toggleLike() {
    const interaction = Object.assign(templates.interactions(), {
      provider: 'twitter',
      providerId: this.props.providerId,
      messageId: this.props.messageId,
      docType: 'like'
    })

    put('interactions1', interaction)
  }

  render() {
    return (
      <button className="message-action" onClick={this.toggleLike.bind(this)}>
        <img className="message-action-icon" src="/assets/fa/advanced-options/raw-svg/solid/thumbs-up.svg"/>
        <span className="message-action-text">Like</span>
        <span className="light side-margins">{this.props.favoriteCount}</span>
      </button>
    )
  }
}

module.exports = {LikeButton}
