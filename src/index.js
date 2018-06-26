const React = require('react')
const ReactDOM = require('react-dom')
const {Provider} = require('react-redux')
const {store} = require('./lib/store')
const {AppRoot} = require('./app-root.js')
const {Header} = require('./header.js')
const {LeftNav} = require('./left-nav.js')
const {Main} = require('./main/index.js')



class App extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      locationHash: window.location.hash.substr(1)
    }

    window.onhashchange = () => {
      this.setState({locationHash: window.location.hash.substr(1)})
    }

    require('./lib/ws.js')
  }

  render() {
    return (
      <Provider store={store}>
        <AppRoot {...this.props} {...this.state}/>
      </Provider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
