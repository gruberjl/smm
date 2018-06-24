const React = require('react')

class ConnectorNewCard extends React.Component {
  handleChange(event) {
    const connector = Object.assign({}, this.props.connector)
    connector[event.target.name] = event.target.value
    this.props.onChange(connector)
  }

  auth() {
    window.open('/auth/twitter', 'newwindow', 'width=300,height=250')
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
