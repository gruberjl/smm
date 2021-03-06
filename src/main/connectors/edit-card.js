const React = require('react')

class ConnectorEditCard extends React.Component {
  handleChange(event) {
    const connector = Object.assign({}, this.props.connector)
    connector[event.target.name] = event.target.value
    this.props.onChange(connector)
  }

  render() {
    const connector = this.props.connector
    return <div id="connector-edit-card" className="card margins padding">
      <div>
        <label>_id: </label>
        <span>{connector._id}</span>
      </div>
      <div>
        <input type="text" placeholder="Connector Name" value={connector.name} onChange={this.handleChange.bind(this)} name="name"/>
      </div>
      {JSON.stringify(connector)}
    </div>
  }
}

module.exports = {ConnectorEditCard}
