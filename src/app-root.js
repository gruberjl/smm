const React = require('react')
const {Header} = require('./header.js')
const {LeftNav} = require('./left-nav.js')
const {Main} = require('./main/index.js')

const AppRoot = (props) => (
  <div id="app-root">
    <Header/>
    <div id="app-body">
      <LeftNav/>
      <Main {...props}/>
    </div>
  </div>
)

module.exports = {AppRoot}
