const React = require('react')
const {connect} = require('react-redux')
const {api} = require('../../lib/index.js')
const {WorkflowEditCard} = require('./edit-card.js')
const {WorkflowEditConnectorCard} = require('./edit-connector-card.js')
const {WorkflowEditFiltersCard} = require('./edit-filters-card.js')
const {WorkflowEditChannelCard} = require('./edit-channel-card.js')
const {withRouter} = require('react-router-dom')

class Component extends React.Component {
  constructor(props) {
    super(props)

    const workflow = Object.assign({}, props.initialWorkflow)

    this.state = {workflow}
  }

  workflowChanged(workflow) {
    this.setState({workflow})
  }

  saveWorkflow() {
    api.workspaces.saveItem(this.props.workspace.id, this.state.workflow, 'workflows')
  }

  deleteWorkflow() {
    api.workspaces.deleteItem(this.props.workspace.id, this.state.workflow.id, 'workflows')
      .then((res) => {
        if (res.status)
          this.props.history.push('/workflows')
      })
  }

  render() {
    const workflow = this.state.workflow
    const headerText = this.props.isNew ? 'Create New Workflow' : `Edit Workflow: ${this.props.initialWorkflow.name}`

    return <main id="workflows-edit-container">
      <header className="side-margins">
        <h1>{headerText}</h1>
      </header>
      <WorkflowEditCard {...this.props} workflow={workflow} onChange={this.workflowChanged.bind(this)}/>
      <WorkflowEditConnectorCard {...this.props} workflow={workflow} onChange={this.workflowChanged.bind(this)}/>
      <WorkflowEditFiltersCard {...this.props} workflow={workflow} onChange={this.workflowChanged.bind(this)}/>
      <WorkflowEditChannelCard {...this.props} workflow={workflow} onChange={this.workflowChanged.bind(this)}/>
      <footer className="space-between side-margins">
        <div>
          <button onClick={this.deleteWorkflow.bind(this)}>Delete</button>
        </div>
        <div>
          <button onClick={this.saveWorkflow.bind(this)}>Save</button>
        </div>
      </footer>
    </main>
  }
}

const mapStateToProps = (state, props) => {
  const params = props.match.params

  const isNew = params.persistence == 'new'
  const initialWorkflow = isNew ? {filters:{language:'en', quality:'low'}} : state.workspace.workflows[params.id]
  const workspace = state.workspace

  return {isNew, initialWorkflow, workspace}
}

const WorkflowsEdit = withRouter(connect(mapStateToProps)(Component))

module.exports = {WorkflowsEdit}
