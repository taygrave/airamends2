// @flow
import assert from 'assert'

import reducer from '../../src/reducers/google-user'

describe('Reducers: Google User', () => {
  const initialState = {}

  it('should return the initial state on @@INIT', () => {
    assert.deepEqual(
      reducer(undefined, { type: '@@INIT' }),
      initialState
    )
  })

  it('should set the user on RECEIVED_GOOGLE_USER', () => {
    const user = {
      avatarUrl: 'me.img',
      email: 'me@me.com',
      firstName: 'Tay',
      lastName: 'Hess',
      name: 'Tay Hess'
    }
    const action = {
      type: 'RECEIVED_GOOGLE_USER',
      ...user
    }

    assert.deepEqual(
      reducer(initialState, action),
      user
    )
  })
})
