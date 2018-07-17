const {newWorkflow} = require('./new-workflow')
const {TwitterSearchWorkflow} = require('./twitter-search-workflow.js')

describe('social:newWorkflow', () => {
  test('return TwitterSearchWorkflow', () => {
    expect(newWorkflow('twitter', {action:'search'}, '1', '2')).toBeInstanceOf(TwitterSearchWorkflow)
  })
})
