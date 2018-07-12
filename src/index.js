const React = require('react')
const ReactDOM = require('react-dom')
const {Provider} = require('react-redux')
const {store} = require('./lib/store')
const {AppRoot} = require('./app-root.js')
const {BrowserRouter} = require('react-router-dom')
const db = require('./lib/db')
db.start(store)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AppRoot />
        </BrowserRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
