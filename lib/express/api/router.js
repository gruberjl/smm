const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const {setData, setWorkspace, sendCreate} = require('./middleware')
const channel = require('./channel')
const workflow = require('./workflow')

router.use(bodyParser.json())
router.use(setWorkspace)

router.post('/channel', setData, channel.create, sendCreate)
router.post('/workflow', setData, workflow.create, sendCreate)

module.exports = {router}
