const React = require('react')
const {connect} = require('react-redux')

const Component = ({workspace}) => (
  <main>
    <pre>{JSON.stringify(workspace, null, 2)}</pre>
  </main>
)

const mapStateToProps = (state) => ({workspace: state.workspace})

const Landing = connect(mapStateToProps)(Component)

module.exports = {Landing}
