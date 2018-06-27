const React = require('react')
const {Link} = require('react-router-dom')

class Header extends React.Component {
  render() {
    return (
      <header className="nav-top space-between">
        <Link className="align-center side-margins" to="/">
          <h1 className="no-margin light">GitBit</h1>
        </Link>
        <div>
          <Link to="/connectors" className="side-margins light">Connectors</Link>
          <Link to="/workflows" className="side-margins light">Workflows</Link>
          <Link to="/channels" className="side-margins light">Channels</Link>
        </div>
      </header>
    )
  }
}

module.exports = {Header}
