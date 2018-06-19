const React = require('react')
const ReactDOM = require('react-dom')
const {Header} = require('./header.jsx')
const {LeftNav} = require('./left-nav.jsx')
const {Main} = require('./main.jsx')

class App extends React.Component {
  render() {
    return (
      <div id="app-root">
        <Header/>
        <div id="app-body">
          <LeftNav/>
          <Main/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
