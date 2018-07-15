const {app} = require('./lib/express')
app.listen(3000, function(){
  console.log('listening on *:3000')
})

require('./lib/social')
// require('./lib/workspace-manager')
