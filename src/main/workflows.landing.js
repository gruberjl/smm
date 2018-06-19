const React = require('react')

class Workflow extends React.Component {
  editFlow(id) {
    return () => {
      window.location = `#workflows/edit/${id}`
    }
  }

  render() {
    const workflow = this.props.workflow
    return (<div className="card stack margins padding link" onClick={this.editFlow(workflow.id)}>
      <div>
        <label>Id: </label>
        <span>{workflow.id}</span>
      </div>
      <div>
        <label>Connector: </label>
        <span>{workflow.connector}</span>
      </div>
      <div>
        <label>Action: </label>
        <span>{workflow.action}</span>
      </div>
      <div>
        <label>Filters: </label>
        <span>{JSON.stringify(workflow.filters)}</span>
      </div>
    </div>)
  }
}

const WorkflowsLanding = ({workspace}) => {
  const workflows = Object.keys(workspace.workflows).map(
    (key) => Object.assign({}, workspace.workflows[key], {id:key})
  )

  const workflowElements = workflows.map(
    (workflow) => <Workflow workflow={workflow} key={workflow.id}/>
  )

  return <main id="workflows-landing-container">{workflowElements}</main>
}

module.exports = {WorkflowsLanding}
