const React = require('react')
const {connect} = require('react-redux')
const {Link, withRouter} = require('react-router-dom')

class Workflow extends React.Component {
  editWorkflow(_id) {
    return () => {
      this.props.history.push(`/workflows/edit/${_id}`)
    }
  }

  render() {
    const workflow = this.props.workflow
    return (<div className="card stack margins padding link" onClick={this.editWorkflow(workflow._id)}>
      <div>
        <label>_id: </label>
        <span>{workflow._id}</span>
      </div>
      <div>
        <label>Name: </label>
        <span>{workflow.name}</span>
      </div>
    </div>)
  }
}

const Component = ({workflows, history}) => {
  const workflowElements = workflows.map(
    (workflow) => <Workflow workflow={workflow} key={workflow._id} history={history}/>
  )

  return <main id="workflows-landing-container">
    <div className="space-between align-center side-margins">
      <h1>Workflows</h1>
      <div>
        <Link to="/workflows/new" className="space-around align-center no-style">
          <img src="/assets/fa/advanced-options/raw-svg/solid/plus.svg" width="28px" height="28px"/>
          <span className="side-padding">New Workflow</span>
        </Link>
      </div>
    </div>
    {workflowElements}
  </main>
}

const mapStateToProps = (state) => ({workflows: state.workspace.workflows})

const WorkflowsLanding = withRouter(connect(mapStateToProps)(Component))

module.exports = {WorkflowsLanding}
