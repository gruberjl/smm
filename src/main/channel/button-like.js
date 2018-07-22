const React = require('react')
const {connect} = require('react-redux')
const {save} = require('../../lib/database')
const templates = require('../../lib/templates')

class Component extends React.Component {
  likeMessage() {
    const interaction = Object.assign(templates.interactions(), {
      provider: 'twitter',
      providerId: this.props.providerId,
      messageId: this.props.messageId,
      docType: 'like',
      connector: {_id: this.props.connectors[0]._id}
    })

    save(interaction).then(res => {
      console.log(res)
    })
  }

  unlikeMessage() {
    const interaction = this.props.liked[0]
    interaction._deleted = true
    save(interaction).then(res => {
      console.log(res)
    })
  }

  toggleLike() {
    if (this.props.liked.length==0)
      this.likeMessage()
    else
      this.unlikeMessage()
  }

  render() {
    const buttonColor = this.props.liked.length>0 ? ' bg-color-success' : ''
    return (
      <button className={'message-action' + buttonColor} onClick={this.toggleLike.bind(this)}>
        <img className="message-action-icon" src="/assets/fa/advanced-options/raw-svg/solid/thumbs-up.svg"/>
        <span className="message-action-text">Like</span>
        <span className="light side-margins">{this.props.likeCount}</span>
      </button>
    )
  }
}

const mapStateToProps = (state) => ({
  connectors: state.workspace.connectors
})

const LikeButton = connect(mapStateToProps)(Component)

module.exports = {LikeButton}
