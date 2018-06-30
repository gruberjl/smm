const React = require('react')

class WorkflowEditCard extends React.Component {
  handleChange(event) {
    const workflow = Object.assign({}, this.props.workflow)
    workflow[event.target.name] = event.target.value
    this.props.onChange(workflow)
  }

  render() {
    const workflow = this.props.workflow
    return <div id="workflow-edit-card" className="card margins padding">
      <div>
        <label>ID: </label>
        <span>{workflow._id}</span>
      </div>
      <div>
        <input type="text" placeholder="Workflow Name" value={workflow.name} onChange={this.handleChange.bind(this)} name="name"/>
      </div>
      {JSON.stringify(workflow)}
    </div>
  }
}

module.exports = {WorkflowEditCard}
