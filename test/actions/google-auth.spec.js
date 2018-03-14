// @flow
import assert from 'assert'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { updateAuthStatus } from '../../src/actions'

const mockStore = configureStore([ thunk ])

describe('Actions: Google OAuth', () => {
  it('is true', async () => {
    const store = mockStore({})
    const newStatus = true
    const expected = [
      {
        type: 'UPDATE_AUTH_STATUS',
        newStatus
      }
    ]

    await store.dispatch(updateAuthStatus({ newStatus }))
    assert.deepEqual(expected, store.getActions())
  })
})
