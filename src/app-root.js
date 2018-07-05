const React = require('react')
const {connect} = require('react-redux')
const {Header} = require('./header.js')
const {LeftNav} = require('./left-nav.js')
const {Main} = require('./main/index.js')

const AppRoot = ({loaded}) => {
  if (loaded) return (
    <div id="app-root">
      <Header/>
      <div id="app-body">
        <LeftNav/>
        <Main />
      </div>
    </div>
  )
  else return (
    <div id="app-root">
      <h1>Loading Please Wait</h1>
    </div>
  )
}

const mapStateToProps = (state) => ({loaded: state.workspace.loaded})

module.exports = {AppRoot: connect(mapStateToProps)(AppRoot)}
