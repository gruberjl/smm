const {resolve} = require('path')
const express = require('express')

const app = express()

app.set('view engine', 'pug')
app.set('views', resolve(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/assets', express.static(resolve(__dirname, 'assets')))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
