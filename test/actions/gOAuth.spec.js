// @flow
import assert from 'assert'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { initAuthGoogle } from '../../src/actions'

const mockStore = configureStore([ thunk ])

describe('Actions: Google OAuth', () => {
  it('is true', async () => {
    const store = mockStore({})
    const expected = [
      { type: 'INIT_AUTH_GOOGLE' }
    ]

    await store.dispatch(initAuthGoogle())
    assert.deepEqual(expected, store.getActions())
  })
})
