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

const mockStore = configureStore([ thunk ])

describe('Actions: Google Status', () => {
  it('authGoogle() dispatches', async () => {
    const store = mockStore({})
    const expected = [
      { type: 'AUTH_GOOGLE' }
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

  it.skip('toggleGoogleSignin() dispatches, makes correct gapi call, and toggles signin', async () => {
    // TODO: stub out gapi calls and make this test pass
    const store = mockStore({})
    const expected = [
      { type: 'TOGGLE_GOOGLE_SIGNIN' },
      { type: 'TOGGLED_GOOGLE_SIGNIN' }
    ]

    await store.dispatch(toggleGoogleSignin())
    assert.deepEqual(expected, store.getActions())
  })

  it.skip('toggleGoogleSignin() dispatches, makes correct gapi call, and toggles signin', async () => {
    // TODO: stub out gapi calls and make this test pass
    const store = mockStore({})
    const expected = [
      { type: 'TOGGLE_GOOGLE_SIGNIN' },
      { type: 'TOGGLED_GOOGLE_SIGNIN' }
    ]

    await store.dispatch(toggleGoogleSignin())
    assert.deepEqual(expected, store.getActions())
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
