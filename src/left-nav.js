const React = require('react')

const ChannelNavLink = ({name}) => (
  <a href={`#channel/${name}`}>{name}</a>
)

class LeftNav extends React.Component {
  render() {
    const channels = Object.keys(this.props.channels).map((key) => (
      <ChannelNavLink name={this.props.channels[key].name} key={key}/>
    ))

    return (
      <aside id="left-nav" className="no-margin">
        <h4 className="light no-margin">channels</h4>
        <div id="channels-container">{channels}</div>
      </aside>
    )
  }
}

module.exports = {LeftNav}
