// @flow
import assert from 'assert'
import configureStore from 'redux-mock-store'

import middleware from '../../src/middleware/google-auth'

const mockLoad = jest.fn()
jest.mock('gapi-client', () => ({
  load: (lib, fn) => mockLoad(lib, fn)
}))

describe('Google Auth Middleware', () => {
  const defaultState = {
    googleStatus: {
      isAuthed: false,
      isSignedIn: false
    }
  }
  let createStore

  beforeEach(() => {
    createStore = configureStore([middleware])
  })

  afterEach(() => {
    mockLoad.mockClear()
  })

  it('should return the next action', () => {
    const store = createStore(defaultState)
    const action = { type: 'cat' }

    assert.equal(
      store.dispatch(action),
      action
    )
  })

  it('should load the gapi-client if is not authed yet and on INIT_GOOGLE', () => {
    const store = createStore(defaultState)
    const action = { type: 'INIT_GOOGLE' }

    assert.equal(
      store.dispatch(action),
      action
    )
    assert.equal(mockLoad.mock.calls.length, 1)
    assert.equal(mockLoad.mock.calls[0][0], 'client:auth2')
    assert.equal(typeof mockLoad.mock.calls[0][1], 'function')
  })

  it('should not load the gapi-client if not INIT_GOOGLE action', () => {
    const store = createStore(defaultState)
    const action = { type: 'NOT_INIT_GOOGLE' }

    assert.equal(
      store.dispatch(action),
      action
    )
    assert.equal(mockLoad.mock.calls.length, 0)
  })

  it('should not load the gapi-client if is authed already on INIT_GOOGLE', () => {
    const store = createStore({
      googleStatus: {
        isAuthed: true,
        isSignedIn: false
      }
    })
    const action = { type: 'INIT_GOOGLE' }

    assert.equal(
      store.dispatch(action),
      action
    )
    assert.equal(mockLoad.mock.calls.length, 0)
  })
})
