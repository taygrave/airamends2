// @flow
import assert from 'assert'

import reducer from '../../src/reducers/google-status'

describe('Google Status reducer', () => {
  const initialState = {
    isAuthed: false,
    isSignedIn: false
  }

  it('should return the initial state on @@INIT', () => {
    assert.deepEqual(
      reducer(undefined, { type: '@@INIT' }),
      initialState
    )
  })

  it('should auth on AUTHED_GOOGLE', () => {
    const expected = {
      isAuthed: true,
      isSignedIn: true
    }

    assert.deepEqual(
      reducer(initialState, { type: 'AUTHED_GOOGLE' }),
      expected
    )
  })

  it('should toggle signin status on TOGGLED_GOOGLE_SIGNIN', () => {
    const previousState = {
      isAuthed: true,
      isSignedIn: true
    }
    const expected = {
      isAuthed: true,
      isSignedIn: false
    }

    assert.deepEqual(
      reducer(previousState, { type: 'TOGGLED_GOOGLE_SIGNIN' }),
      expected
    )
  })
})
