const React = require('react')
const {connect} = require('react-redux')
const {Link, withRouter} = require('react-router-dom')

class Connector extends React.Component {
  editConnector(_id) {
    return () => {
      this.props.history.push(`/connectors/edit/${_id}`)
    }
  }

  render() {
    const connector = this.props.connector
    return (<div className="card stack margins padding link" onClick={this.editConnector(connector._id)}>
      <div>
        <label>Id: </label>
        <span>{connector._id}</span>
      </div>
      <div>
        <label>Name: </label>
        <span>{connector.name}</span>
      </div>
    </div>)
  }
}

const Component = ({connectors, history}) => {
  const ConnectorElements = connectors.map(
    (connector) => <Connector connector={connector} key={connector._id} history={history}/>
  )

  return <main id="connectors-landing-container">
    <div className="space-between align-center side-margins">
      <h1>Connectors</h1>
      <div>
        <Link to="/connectors/new" className="space-around align-center no-style">
          <img src="/assets/fa/advanced-options/raw-svg/solid/plus.svg" width="28px" height="28px"/>
          <span className="side-padding">New Connector</span>
        </Link>
      </div>
    </div>
    {ConnectorElements}
  </main>
}

const mapStateToProps = (state) => ({connectors: state.workspace.connectors})

const ConnectorsEditLanding = withRouter(connect(mapStateToProps)(Component))

module.exports = {ConnectorsEditLanding}
