// @flow
import assert from 'assert'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { fetchGoogleUser } from '../../src/actions'

const mockUser = {
  avatarUrl: 'me.img',
  email: 'me@me.com',
  firstName: 'Tay',
  lastName: 'Hess',
  name: 'Tay Hess'
}
jest.mock('gapi-client', () => {
  return {
    auth2: {
      getAuthInstance: () => ({
        currentUser: {
          get: () => ({
            getBasicProfile: () => ({
              getImageUrl: () => mockUser.avatarUrl,
              getEmail: () => mockUser.email,
              getGivenName: () => mockUser.firstName,
              getFamilyName: () => mockUser.lastName,
              getName: () => mockUser.name
            })
          })
        }
      })
    }
  }
})

const mockStore = configureStore([ thunk ])

describe('Actions: Google User', () => {
  it('fetchGoogleUser() dispatches', async () => {
    const store = mockStore({})
    const expected = [
      { type: 'FETCH_GOOGLE_USER' },
      {
        type: 'RECEIVED_GOOGLE_USER',
        ...mockUser
      }
    ]

    await store.dispatch(fetchGoogleUser())
    assert.deepEqual(expected, store.getActions())
  })
})
