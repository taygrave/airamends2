// @flow
import gapi from 'gapi-client'
import { type Middleware } from 'redux'

import { updateAuthStatus } from '../actions/google-auth'
import {
  googleClientId,
  googleDiscoveryDocs,
  googleScopes
} from '../config'

import {
  type AnyAction,
  type State
} from '../types'

export default ((store) => (next) => (action) => {
  const result = next(action)
  const state = store.getState()
  const { googleAuthStatus: { isSignedIn } } = state

  const initializeGoogle = async () => {
    try {
      await gapi.client.init({
        discoveryDocs: googleDiscoveryDocs,
        clientId: googleClientId,
        scope: googleScopes
      })
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen((updateAuthStatus))

      // Handle the initial sign-in state.
      store.dispatch({ type: 'UPDATE_AUTH_STATUS', newStatus: true })
    } catch (e) {
      console.log('ERROR', e)
    }
  }

  switch (action.type) {
    case 'AUTH_GOOGLE': {
      gapi.load('client:auth2', initializeGoogle)
      return result
    }
    case 'UPDATE_AUTH_STATUS': {
      if (!isSignedIn) {
        gapi.auth2.getAuthInstance().signOut()
      } else {
        gapi.auth2.getAuthInstance().signIn()
      }
      return result
    }
    default:
      return result
  }
}: Middleware<State, AnyAction>)
