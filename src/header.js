const React = require('react')

class Header extends React.Component {
  render() {
    return (
      <header className="nav-top space-between">
        <a className="align-center side-margins" href="#">
          <h1 className="no-margin light">GitBit</h1>
        </a>
        <div>
          <a href="#connectors" className="side-margins light">Connectors</a>
          <a href="#workflows" className="side-margins light">Workflows</a>
          <a href="#channels" className="side-margins light">Channels</a>
        </div>
      </header>
    )
  }
}

module.exports = {Header}
