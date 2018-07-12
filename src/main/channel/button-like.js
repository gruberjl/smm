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
    console.log(this.props.interactions)
    const buttonColor = this.props.interactions.length>0 ? 'color-success' : ''
    return (
      <button className={'message-action ' + buttonColor} onClick={this.toggleLike.bind(this)}>
        <img className="message-action-icon" src="/assets/fa/advanced-options/raw-svg/solid/thumbs-up.svg"/>
        <span className="message-action-text">Like</span>
        <span className="light side-margins">{this.props.favoriteCount}</span>
      </button>
    )
  }
}

const mapStateToProps = (state, props) => ({
  connectors: state.workspace.connectors,
  interactions: state.interactions.filter(i => i.messageId == props.messageId)
})

const LikeButton = connect(mapStateToProps)(Component)

module.exports = {LikeButton}
