module.exports = {
  'docs': [
    {
      '_id': '3dcb161f-6e38-4ad9-b693-fa0b48b6a3a8',
      '_rev': '1-56930b3d537aedcbfdd0ab49484513e1',
      'docType': 'connector',
      'name': 'Twitter @gruberjl',
      'account': 'f9a7ce16-f423-496b-b224-2f0b62fa63ff',
      'provider': 'twitter',
      'accountName': 'gruberjl',
      'image': 'https://pbs.twimg.com/profile_images/828784665083465728/4ungbkuP_normal.jpg'
    },
    {
      '_id': '40c2fb59-900b-4e2f-9336-cc0db28aafd9',
      '_rev': '3-890d28a1142bfc08e5f1ed2e0854760d',
      'docType': 'workflow',
      'name': 'Twitter @Gruberjl to Office365',
      'connector': '3dcb161f-6e38-4ad9-b693-fa0b48b6a3a8',
      'channel': 'd7e1b913-561d-422b-b06a-990b873e6f6b',
      'action': 'tweet',
      'filters': {
        'language': 'en',
        'search': '#office365',
        'quality': 'low'
      }
    },
    {
      '_id': 'd7e1b913-561d-422b-b06a-990b873e6f6b',
      '_rev': '1-2e5ef42a493d7a717a50210456741050',
      'docType': 'channel',
      'name': 'Office 365',
      'dbName': 'channel0'
    }
  ],
  'connectors': [
    {
      'doc': {
        '_id': '3dcb161f-6e38-4ad9-b693-fa0b48b6a3a8',
        '_rev': '1-56930b3d537aedcbfdd0ab49484513e1',
        'docType': 'connector',
        'name': 'Twitter @gruberjl',
        'account': 'f9a7ce16-f423-496b-b224-2f0b62fa63ff',
        'provider': 'twitter',
        'accountName': 'gruberjl',
        'image': 'https://pbs.twimg.com/profile_images/828784665083465728/4ungbkuP_normal.jpg'
      },
      'account': {
        '_id': 'f9a7ce16-f423-496b-b224-2f0b62fa63ff',
        '_rev': '1-b3510b2e4d20db0fc3b9c301dcfd7d23',
        'token': 'fake-token',
        'tokenSecret': 'fake-secret',
        'provider': 'twitter'
      },
      'actions': {
        'tweet': {
          'workflows': [
            {
              'doc': {
                '_id': '40c2fb59-900b-4e2f-9336-cc0db28aafd9',
                '_rev': '3-890d28a1142bfc08e5f1ed2e0854760d',
                'docType': 'workflow',
                'name': 'Twitter @Gruberjl to Office365',
                'connector': '3dcb161f-6e38-4ad9-b693-fa0b48b6a3a8',
                'channel': 'd7e1b913-561d-422b-b06a-990b873e6f6b',
                'action': 'tweet',
                'filters': {
                  'language': 'en',
                  'search': '#office365',
                  'quality': 'low'
                }
              },
              'nextRun': 0
            }
          ]
        }
      },
      'provider': {
        'client': {
          'VERSION': '1.7.1',
          'options': {
            'consumer_key': 'fake-key',
            'consumer_secret': 'fake-secret',
            'access_token_key': 'fake-token',
            'access_token_secret': 'fake-secret',
            'bearer_token': null,
            'rest_base': 'https://api.twitter.com/1.1',
            'stream_base': 'https://stream.twitter.com/1.1',
            'user_stream_base': 'https://userstream.twitter.com/1.1',
            'site_stream_base': 'https://sitestream.twitter.com/1.1',
            'media_base': 'https://upload.twitter.com/1.1',
            'request_options': {
              'headers': {
                'Accept': '*/*',
                'Connection': 'close',
                'User-Agent': 'node-twitter/1.7.1'
              },
              'oauth': {
                'consumer_key': 'fake_key',
                'consumer_secret': 'fake-secret',
                'token': 'fake-token',
                'token_secret': 'fake-secret'
              }
            }
          },
          'allow_promise': true
        },
        'tweetSearch': {
          'apiLimit': {
            'callsPerMinute': 12,
            'cycleStart': 1530626675464,
            'cycleLength': 60000,
            'callsThisCycle': 0
          }
        }
      }
    }
  ]
}
