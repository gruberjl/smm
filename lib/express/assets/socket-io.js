/* eslint no-undef: 0 */

const socket = io()

socket.on('tweet', (msg) => {
  console.log(msg)
})
