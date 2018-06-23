const React = require('react')

class ConnectorNewCard extends React.Component {
  handleChange(event) {
    const connector = Object.assign({}, this.props.connector)
    connector[event.target.name] = event.target.value
    this.props.onChange(connector)
  }

  render() {
    const connector = this.props.connector
    return <div id="connector-new-card" className="card margins padding">
      <div><h2>Platform</h2></div>
      <div><a href="twitter">Twitter</a></div>
      {JSON.stringify(connector)}
    </div>
  }
}

module.exports = {ConnectorNewCard}
