const React = require('react')
const ReactDOM = require('react-dom')
const {ws} = require('./lib/index.js')
const {Header} = require('./header.js')
const {LeftNav} = require('./left-nav.js')
const {Main} = require('./main/index.js')
const {Provider} = require('react-redux')
const {store} = require('./lib/store')

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      ws,
      locationHash: window.location.hash.substr(1),
      workspace: window.intitalWorkspace
    }

    this.state.ws.on('WORKSPACE_UPDATED', ({workspace}) => {
      console.log('workspace updated')
      this.setState({workspace})
    })

    window.onhashchange = () => {
      this.setState({locationHash: window.location.hash.substr(1)})
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div id="app-root">
          <Header/>
          <div id="app-body">
            <LeftNav channels={this.state.workspace.channels}/>
            <Main locationHash={this.state.locationHash} messages={this.state.messages} workspace={this.state.workspace}/>
          </div>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
