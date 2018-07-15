const p = require('./index.js')

jest.mock('./twitter')
const t = require('./twitter')

describe('providerSubmit', () => {
  describe('twitter', () => {
    afterEach(() => {
      t.like.mockClear()
    })

    test('should like', () => {
      p.submit('twitter', 'like', 'token', 'secret', 'id')
      expect(t.like.mock.calls.length).toEqual(1)
      expect(t.like.mock.calls[0]).toEqual(['token', 'secret', 'id'])
    })

    test('should unlike', () => {
      p.submit('twitter', 'unlike', 'token', 'secret', 'id')
      expect(t.unlike.mock.calls.length).toEqual(1)
      expect(t.unlike.mock.calls[0]).toEqual(['token', 'secret', 'id'])
    })

    test('should post', () => {
      p.submit('twitter', 'post', 'token', 'secret', 'message')
      expect(t.post.mock.calls.length).toEqual(1)
      expect(t.post.mock.calls[0]).toEqual(['token', 'secret', 'message'])
    })

    test('should unpost', () => {
      p.submit('twitter', 'unpost', 'token', 'secret', 'id')
      expect(t.unpost.mock.calls.length).toEqual(1)
      expect(t.unpost.mock.calls[0]).toEqual(['token', 'secret', 'id'])
    })

    test('should share', () => {
      p.submit('twitter', 'share', 'token', 'secret', 'id')
      expect(t.share.mock.calls.length).toEqual(1)
      expect(t.share.mock.calls[0]).toEqual(['token', 'secret', 'id'])
    })

    test('should unshare', () => {
      p.submit('twitter', 'unshare', 'token', 'secret', 'id')
      expect(t.unshare.mock.calls.length).toEqual(1)
      expect(t.unshare.mock.calls[0]).toEqual(['token', 'secret', 'id'])
    })
  })
})
