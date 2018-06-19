const React = require('react')
const ReactDOM = require('react-dom')
const {Header} = require('./header.js')
const {LeftNav} = require('./left-nav.js')
const {Main} = require('./main.js')

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      workspace: {connectors:{}, channels:{}, workflows:{}},
      socket: io()
    }

    this.state.socket.on('message', (msg) => {
      this.setState((prevState) => ({ messages: [].concat(prevState.messages, [msg]) }))
    })

    this.state.socket.on('workspace', (workspace) => {
      this.setState({workspace})
    })
  }

  render() {
    return (
      <div id="app-root">
        <Header/>
        <div id="app-body">
          <LeftNav channels={this.state.workspace.channels}/>
          <Main/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
