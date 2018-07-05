const React = require('react')
const {Header} = require('./header.js')
const {LeftNav} = require('./left-nav.js')
const {Main} = require('./main/index.js')

const AppRoot = () => (
  <div id="app-root">
    <Header/>
    <div id="app-body">
      <LeftNav/>
      <Main />
    </div>
  </div>
)

module.exports = {AppRoot}
