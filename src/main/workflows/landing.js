const React = require('react')

class Workflow extends React.Component {
  editWorkflow(id) {
    return () => {
      window.location = `#workflows/edit/${id}`
    }
  }

  render() {
    const workflow = this.props.workflow
    return (<div className="card stack margins padding link" onClick={this.editWorkflow(workflow.id)}>
      <div>
        <label>Id: </label>
        <span>{workflow.id}</span>
      </div>
      <div>
        <label>Name: </label>
        <span>{workflow.name}</span>
      </div>
    </div>)
  }
}

const WorkflowsLanding = ({workspace}) => {
  const workflows = Object.keys(workspace.workflows).map(
    (key) => Object.assign({}, workspace.workflows[key])
  )

  const workflowElements = workflows.map(
    (workflow) => <Workflow workflow={workflow} key={workflow.id}/>
  )

  return <main id="workflows-landing-container">
    <div className="space-between align-center side-margins">
      <h1>Workflows</h1>
      <div>
        <a href="#workflows/new" className="space-around align-center no-style">
          <img src="/assets/fa/advanced-options/raw-svg/solid/plus.svg" width="28px" height="28px"/>
          <span className="side-padding">New Workflow</span>
        </a>
      </div>
    </div>
    {workflowElements}
  </main>
}

module.exports = {WorkflowsLanding}
