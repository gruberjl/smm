import { join } from 'path'
import * as express from 'express'

const assets = join(__dirname, '..', '..', 'assets')
const app = express()

app.use('/assets', express.static(assets))

app.get('*', (_req, res) => {
  res.sendFile(join(assets, 'index.html'))
})

app.listen(3000, function() {
  console.log('listening on *:3000')
})
