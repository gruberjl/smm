const React = require('react')

class WorkflowEditConnectorCard extends React.Component {
  handleChange(event) {
    console.log(event.target.value)
    const workflow = Object.assign({}, this.props.workflow)
    workflow.connector = event.target.value
    this.props.onChange(workflow)
  }

  render() {
    const workflow = this.props.workflow
    const connectors = Object.keys(this.props.workspace.connectors).map((id) => {
      const connector = this.props.workspace.connectors[id]
      return (
        <option value={connector.id} key={connector.id}>
          {connector.name}
        </option>
      )
    }

    )
    return <div id="workflow-edit-connector-card" className="card margins padding">
      <div>
        <label>Select a Connector</label>
        <div>
          <select onChange={this.handleChange.bind(this)} value={workflow.connector}>
            <option value=''>Select a Connector</option>
            {connectors}
          </select>
        </div>
      </div>
    </div>
  }
}

module.exports = {WorkflowEditConnectorCard}
