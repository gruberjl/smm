const React = require('react')
const {connect} = require('react-redux')
const {put} = require('../../lib/database')
const templates = require('../../lib/templates')

class Component extends React.Component {
  toggleLike() {
    const interaction = Object.assign(templates.interactions(), {
      provider: 'twitter',
      providerId: this.props.providerId,
      messageId: this.props.messageId,
      docType: 'like',
      connector: {_id: this.props.connectors[0]._id}
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

const mapStateToProps = (state) => ({connectors: state.workspace.connectors})

const LikeButton = connect(mapStateToProps)(Component)

module.exports = {LikeButton}
