const React = require('react')
const ReactDOM = require('react-dom')
const {Provider} = require('react-redux')
const {store} = require('./lib/store')
const {AppRoot} = require('./app-root.js')
const {BrowserRouter} = require('react-router-dom')

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
        <BrowserRouter>
          <AppRoot {...this.props} {...this.state}/>
        </BrowserRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
