const React = require('react')
const {ChannelEditCard} = require('./edit-card.js')

const ChannelsEdit = (props) => {
  let channel = {}

  const arrLocation = props.locationHash.split('/')
  if (arrLocation[1] == 'new') {
    channel = {name: '', id: ''}
  } else {
    channel = props.workspace.channels[arrLocation[2]]
  }

  return <main id="channels-edit-container">
    <ChannelEditCard {...props} channel={channel}/>
  </main>
}

module.exports = {ChannelsEdit}
