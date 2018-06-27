const React = require('react')
const {connect} = require('react-redux')
const {Route, withRouter} = require('react-router-dom')
const {api} = require('../../lib/index.js')
const {ConnectorEditCard} = require('./edit-card.js')
const {ConnectorNewCard} = require('./new-card.js')

class Component extends React.Component {
  constructor(props) {
    super(props)

    const connector = Object.assign({}, props.initialConnector)

    this.state = {connector}
  }

  connectorChanged(connector) {
    this.setState({connector})
  }

  saveConnector() {
    api.workspaces.saveItem(this.props.workspace.id, this.state.connector, 'connectors')
  }

  deleteConnector() {
    api.workspaces.deleteItem(this.props.workspace.id, this.state.connector.id, 'connectors')
      .then((res) => {
        if (res.status)
          this.props.history.push('/connectors')
      })
  }

  render() {
    const connector = this.state.connector
    const headerText = this.props.isNew ? 'Create New Connector' : `Edit Connector: ${this.props.initialConnector.name}`

    const card = this.props.isNew ?
      <ConnectorNewCard connector={connector} onChange={this.connectorChanged.bind(this)}/> :
      <ConnectorEditCard connector={connector} onChange={this.connectorChanged.bind(this)}/>

    return <main id="connectors-edit-container">
      <header className="side-margins">
        <h1>{headerText}</h1>
      </header>
      {card}
      <footer className="space-between side-margins">
        <div>
          <button onClick={this.deleteConnector.bind(this)}>Delete</button>
        </div>
        <div>
          <button onClick={this.saveConnector.bind(this)}>Save</button>
        </div>
      </footer>
    </main>
  }
}

const mapStateToProps = (state, props) => {
  const params = props.match.params

  const isNew = params.persistence == 'new'
  const initialConnector = isNew ? {} : state.workspace.connectors[params.id]
  const workspace = state.workspace

  return {isNew, initialConnector, workspace}
}

const ConnectorsEdit = withRouter(connect(mapStateToProps)(Component))

module.exports = {ConnectorsEdit}
