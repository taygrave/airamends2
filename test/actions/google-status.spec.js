// @flow
import assert from 'assert'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  authGoogle,
  authedGoogle,
  toggleGoogleSignin,
  toggledGoogleSignin
} from '../../src/actions'

const mockSignIn = jest.fn()
const mockSignOut = jest.fn()
jest.mock('gapi-client', () => {
  return {
    auth2: {
      getAuthInstance: () => ({
        signIn: mockSignIn,
        signOut: mockSignOut
      })
    }
  }
})

const mockStore = configureStore([ thunk ])

describe('Actions: Google Status', () => {
  const defaultState = {
    googleStatus: {
      isAuthed: true,
      isSignedIn: false
    }
  }

  afterEach(() => {
    mockSignIn.mockClear()
    mockSignOut.mockClear()
  })

  it('authGoogle() dispatches', async () => {
    const store = mockStore({})
    const expected = [
      { type: 'AUTH_GOOGLE' },
      { type: 'AUTHED_GOOGLE' }
    ]

    await store.dispatch(authGoogle())
    assert.deepEqual(expected, store.getActions())
  })

  it('authedGoogle() dispatches', async () => {
    const store = mockStore({})
    const expected = [
      { type: 'AUTHED_GOOGLE' }
    ]

    await store.dispatch(authedGoogle())
    assert.deepEqual(expected, store.getActions())
  })

  it('when signed out, toggleGoogleSignin() dispatches, makes correct gapi call, and toggles signin', async () => {
    const store = mockStore(defaultState)
    const expected = [
      { type: 'TOGGLE_GOOGLE_SIGNIN' },
      { type: 'TOGGLED_GOOGLE_SIGNIN' }
    ]

    await store.dispatch(toggleGoogleSignin())
    assert.deepEqual(expected, store.getActions())
    assert.equal(mockSignIn.mock.calls.length, 1)
    assert.equal(mockSignOut.mock.calls.length, 0)
  })

  it('when signed in, toggleGoogleSignin() dispatches, makes correct gapi call, and toggles signin', async () => {
    const store = mockStore({
      googleStatus: {
        isAuthed: true,
        isSignedIn: true
      }
    })
    const expected = [
      { type: 'TOGGLE_GOOGLE_SIGNIN' },
      { type: 'TOGGLED_GOOGLE_SIGNIN' }
    ]

    await store.dispatch(toggleGoogleSignin())
    assert.deepEqual(expected, store.getActions())
    assert.equal(mockSignIn.mock.calls.length, 0)
    assert.equal(mockSignOut.mock.calls.length, 1)
  })

  it('toggledGoogleSignin() dispatches', async () => {
    const store = mockStore({})
    const expected = [
      { type: 'TOGGLED_GOOGLE_SIGNIN' }
    ]

    await store.dispatch(toggledGoogleSignin())
    assert.deepEqual(expected, store.getActions())
  })
})
