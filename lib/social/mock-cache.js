const simpleCache = {
  connectors: [
    {
      _id: 'asdf',
      provider: 'twitter',
      client: {
        access_token_key: '1',
        access_token_secret: '1'
      },
      search: {
        apiLimits: {
          callsPerCycle: 12,
          cycleStart: (new Date()).getTime(),
          cycleLength: 60000,
          callsLeftOnCycle: 12
        },
        workflows: [
          {
            _id: '123',
            query: {q:'a'},
            nextRun: 123
          }
        ]
      }
    }
  ]
}

module.exports = {simpleCache}
