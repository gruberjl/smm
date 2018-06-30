const React = require('react')
const {connect} = require('react-redux')

class Component extends React.Component {
  componentDidUpdate() {
    console.info('componentDidUpdate')
    console.log(this.props)
    if (this.props.isSaved && this.state.authWindow) {
      this.state.authWindow.close()
      this.setState({authWindow: null})
    }
  }

  handleChange(event) {
    const connector = Object.assign({}, this.props.connector)
    connector[event.target.name] = event.target.value
    this.props.onChange(connector)
  }

  auth() {
    const url = `/auth/twitter?workspaceId=workspace1&connectorId=${this.props.connector._id}`
    this.setState({
      authWindow: window.open(url, 'newwindow', 'width=500,height=500')
    })
  }

  render() {
    const connector = this.props.connector
    return <div id="connector-new-card" className="card margins padding">
      <div><h2>Platform</h2></div>
      <div><button onClick={this.auth.bind(this)}>Twitter</button></div>
      {JSON.stringify(connector)}
    </div>
  }
}

const mapStateToProps = (state, props) => {
  console.log(props.connector._id)
  const isSaved = Boolean(state.workspace.connectors.find(c => c._id == props.connector._id))
  console.log(isSaved)

  return {isSaved}
}

const ConnectorNewCard = connect(mapStateToProps)(Component)

module.exports = {ConnectorNewCard}
