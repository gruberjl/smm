const React = require('react')
const ReactDOM = require('react-dom')
const {Header} = require('./header.js')
const {LeftNav} = require('./left-nav.js')
const {Main} = require('./main/index.js')

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      workspace: {connectors:{}, channels:{}, workflows:{}},
      socket: io(),
      locationHash: window.location.hash.substr(1)
    }

    this.state.socket.on('message', (msg) => {
      console.log('message received')
      console.dir(msg)
      this.setState((prevState) => ({ messages: [].concat(prevState.messages, [msg]) }))
    })

    this.state.socket.on('messages', (response) => {
      console.log('messages received')
      const workflow = response.workflow
      const messages = response.events.map((event) => Object.assign({workflow}, event))
      console.log(messages)
      this.setState((prevState) => ({ messages: [].concat(prevState.messages, messages) }))
    })

    this.state.socket.on('workspace', (workspace) => {
      this.setState({workspace})
    })

    window.onhashchange = () => {
      this.setState({locationHash: window.location.hash.substr(1)})
    }
  }

  render() {
    return (
      <div id="app-root">
        <Header/>
        <div id="app-body">
          <LeftNav channels={this.state.workspace.channels}/>
          <Main locationHash={this.state.locationHash} messages={this.state.messages}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
