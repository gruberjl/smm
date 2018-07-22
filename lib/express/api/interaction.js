const {put, get} = require('../../database/server')
const Provider = require('../../provider')

const submit = async (accessToken, tokenSecret, interaction) => {
  const provider = interaction.provider
  const action = interaction.docType
  const args = [provider, action, accessToken, tokenSecret]

  if (provider == 'twitter' && (action == 'like' || action == 'share'))
    args.push(interaction.providerId)
  else if (provider == 'twitter' && action == 'post')
    args.push(interaction.message)

  return await Provider.submit(...args)
}

const createLike = async (req, res, next) => {
  const connector = await get(req.workspace.dbName, req.data.connector._id)
  const account = await get('accounts', connector.account._id)
  const results = await submit(account.token, account.tokenSecret, req.data)

  if (results.status == 200)
    res.data = await put(req.workspace.interactionsDbName, req.data)
  else
    res.error = results

  next()
}

const unLike = async (accessToken, tokenSecret, interaction) => {
  const results = await Provider.twitter.unlike(accessToken, tokenSecret, interaction.providerId)
  return results
}

const updateLike = async (req, res, next) => {
  const connector = await get(req.workspace.dbName, req.data.connector._id)
  const account = await get('accounts', connector.account._id)
  const results = await unLike(account.token, account.tokenSecret, req.data)
  if (results.status == 200)
    res.data = await put(req.workspace.interactionsDbName, req.data)
  else
    res.error = results
  next()
}

module.exports = {createLike, updateLike}
