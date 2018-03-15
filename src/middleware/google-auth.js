// @flow
import gapi from 'gapi-client'
import { type Middleware } from 'redux'

import { toggleGoogleSignin } from '../actions/google-auth'
import {
  googleClientId,
  googleDiscoveryDocs,
  googleScopes
} from '../config'

import {
  type AnyAction,
  type State
} from '../types'

// TODO: Consider moving google signin stuff back into the actions
// once we can differentiate between an auth and a sign on

export default ((store) => (next) => (action) => {
  const result = next(action)
  const state = store.getState()
  const { googleAuthStatus: { isAuthed } } = state

  const initializeGoogle = async () => {
    try {
      await gapi.client.init({
        discoveryDocs: googleDiscoveryDocs,
        clientId: googleClientId,
        scope: googleScopes
      })
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen((toggleGoogleSignin))

      // Handle the initial sign-in state.
      store.dispatch({ type: 'TOGGLE_GOOGLE_SIGNIN' })
    } catch (e) {
      console.log('ERROR', e)
    }
  }

  switch (action.type) {
    case 'AUTH_GOOGLE': {
      gapi.load('client:auth2', initializeGoogle)
      return result
    }
    case 'TOGGLE_GOOGLE_SIGNIN': {
      try {
        if (isAuthed) {
          gapi.auth2.getAuthInstance().signOut()
        } else {
          gapi.auth2.getAuthInstance().signIn()
        }

        store.dispatch({ type: 'TOGGLED_GOOGLE_SIGNIN', isAuthed: !isAuthed })
      } catch (e) {
        console.log('ERROR', e)
      }
      return result
    }
    default:
      return result
  }
}: Middleware<State, AnyAction>)
