const React = require('react')
const {connect} = require('react-redux')
const {withRouter} = require('react-router-dom')
const {MessageCard} = require('./message-card')

const Component = ({docs}) => (
  <main id="messages-container">
    {docs.map((doc) => (
      <MessageCard doc={doc} key={doc._id}/>
    ))}
  </main>
)

const mapStateToProps = (state, props) => {
  const params = props.match.params
  const channel = state.workspace.channels.find((channel) => channel._id == params._id)
  const docs = state.channel[channel.dbName].docs

  return {docs}
}

const Channel = withRouter(connect(mapStateToProps)(Component))

module.exports = {Channel}
