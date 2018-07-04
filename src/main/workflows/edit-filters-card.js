const React = require('react')

class WorkflowEditFiltersCard extends React.Component {
  handleChange(event) {
    const workflow = Object.assign({}, this.props.workflow)
    workflow.filters[event.target.name] = event.target.value
    this.props.onChange(workflow)
  }

  render() {
    const workflow = this.props.workflow

    return (
      <div id="workflow-edit-filters-card" className="card margins padding">
        <div>
          <label>Select a Language</label>
          <div>
            <select name="language" onChange={this.handleChange.bind(this)} value={workflow.filters.language}>
              <option value=''>All</option>
              <option value='en'>English</option>
            </select>
          </div>
        </div>
        <div>
          <label>Enter a search string</label>
          <div>
            <input name="search" type="text" placeholder="Search String"
              value={workflow.filters.search}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div>
          <label>Quality</label>
          <div>
            <select name="resultType" onChange={this.handleChange.bind(this)} value={workflow.filters.quality}>
              <option value='recent'>Recent</option>
              <option value='popular'>Popular</option>
              <option value='mixed'>Mixed</option>
            </select>
          </div>
        </div>
        <div>
          <label>Only From People with more than followers</label>
          <div>
            <input name="fromPopularity" type="number" placeholder="X Followers"
              value={workflow.filters.fromPopularity}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div>
          <label>Include Retweets</label>
          <div>
            <input name="includeShares" type="checkbox" placeholder="Include Retweets"
              value={workflow.filters.includeShares}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = {WorkflowEditFiltersCard}
