const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const {setData, setWorkspace, sendCreate} = require('./middleware')
const channel = require('./channel')
const workflow = require('./workflow')
const interaction = require('./interaction')

router.use(bodyParser.json())
router.use(setWorkspace)

router.post('/channel/update', setData, channel.update, sendCreate)
router.post('/channel', setData, channel.create, sendCreate)
router.post('/workflow/update', setData, workflow.update, sendCreate)
router.post('/workflow', setData, workflow.create, sendCreate)
router.post('/like', setData, interaction.createLike, sendCreate)

module.exports = {router}
