// @flow
import assert from 'assert'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { toggleGoogleSignin } from '../../src/actions'

const mockStore = configureStore([ thunk ])

describe('Actions: Google OAuth', () => {
  it('is true', async () => {
    const store = mockStore({})
    const shouldBeSignedIn = true
    const expected = [
      {
        type: 'TOGGLE_GOOGLE_SIGNIN',
        shouldBeSignedIn
      }
    ]

    await store.dispatch(toggleGoogleSignin())
    assert.deepEqual(expected, store.getActions())
  })
})
