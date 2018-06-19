const React = require('react')

class LeftNav extends React.Component {
  render() {
    return (
      <aside id="left-nav" className="no-margin">
        <h4 className="light no-margin">channels</h4>
        <div id="channels-container"></div>
      </aside>
    )
  }
}

module.exports = {LeftNav}
