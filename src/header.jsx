const React = require('react')

class Header extends React.Component {
  render() {
    return (
      <header className="nav-top space-between">
        <a className="align-center side-margins">
          <h1 className="no-margin light">GitBit</h1>
        </a>
      </header>
    )
  }
}

module.exports = {Header}
