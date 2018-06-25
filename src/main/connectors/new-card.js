const React = require('react')
const uuid = require('uuid/v4')
const {ws} = require('../../lib/index.js')

class ConnectorNewCard extends React.Component {
  constructor(props) {
    super(props)
    this.state={id:uuid()}

    ws.on('WORKSPACE_UPDATED', ({workspace}) => {
      console.info('ConnectorNewCard received WORKSPACE_UPDATED')
      console.info(this.state.id)
      console.info(workspace.connectors)
      console.info(this.state.authWindow)
      if (workspace.connectors[this.state.id] && this.state.authWindow) {
        this.state.authWindow.close()
        this.setState({authWindow: null})
      }
    })
  }

  handleChange(event) {
    const connector = Object.assign({}, this.props.connector)
    connector[event.target.name] = event.target.value
    this.props.onChange(connector)
  }

  auth() {
    const url = `/auth/twitter?workspaceId=${this.props.workspace.id}&connectorId=${this.state.id}`
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

module.exports = {ConnectorNewCard}
