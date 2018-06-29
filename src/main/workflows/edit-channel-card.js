const React = require('react')

class WorkflowEditChannelCard extends React.Component {
  handleChange(event) {
    console.log(event.target.value)
    const workflow = Object.assign({}, this.props.workflow)
    workflow.channel = event.target.value
    this.props.onChange(workflow)
  }

  render() {
    const workflow = this.props.workflow
    const channels = this.props.workspace.channels.map((channel) => {
      return (
        <option value={channel._id} key={channel._id}>
          {channel.name}
        </option>
      )
    }

    )
    return <div id="workflow-edit-channel-card" className="card margins padding">
      <div>
        <label>Select a Channel</label>
        <div>
          <select onChange={this.handleChange.bind(this)} value={workflow.channel}>
            <option value=''>Select a Channel</option>
            {channels}
          </select>
        </div>
      </div>
    </div>
  }
}

module.exports = {WorkflowEditChannelCard}
