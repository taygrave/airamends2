// @flow
import assert from 'assert'

import reducer from '../../src/reducers/google-emails'

describe('Reducers: Google Emails', () => {
  const initialState = {}

  it('should return the initial state on @@INIT', () => {
    assert.deepEqual(
      reducer(undefined, { type: '@@INIT' }),
      initialState
    )
  })

  it('should set loading status on FETCH_EMAILS', () => {
    const action = { type: 'FETCH_EMAILS' }

    assert.deepEqual(
      reducer(initialState, action),
      {
        loading: true
      }
    )
  })

  it('should set emails and loading status as false when chunks are complete on FETCHED_EMAILS', () => {
    const emails = {
      '123': 'email 1'
    }
    const action = {
      type: 'FETCHED_EMAILS',
      thisChunk: 1,
      totalChunks: 1,
      response: emails
    }

    assert.deepEqual(
      reducer(initialState, action),
      {
        ...emails,
        loading: false
      }
    )
  })

  it('should set emails and not change loading statuswhen chunks are incomplete on FETCHED_EMAILS', () => {
    const state = {
      '123': 'email 1',
      loading: true
    }
    const emails = {
      '456': 'email 2'
    }
    const action = {
      type: 'FETCHED_EMAILS',
      thisChunk: 1,
      totalChunks: 2,
      response: emails
    }

    assert.deepEqual(
      reducer(state, action),
      {
        ...state,
        ...emails
      }
    )
  })
})
