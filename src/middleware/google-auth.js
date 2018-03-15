// @flow
import gapi from 'gapi-client'
import { type Middleware } from 'redux'

import { toggleGoogleSignin } from '../actions/google-status'
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
  const { googleStatus: { isAuthed } } = state

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
      gapi.auth2.getAuthInstance().signIn()

      // TODO: read google docs to figure out how to make sure this
      // doesn't dispath until actually definitely authed
      store.dispatch({ type: 'AUTHED_GOOGLE' })
    } catch (e) {
      console.log('ERROR', e)
    }
  }

  switch (action.type) {
    case 'AUTH_GOOGLE': {
      if (!isAuthed) {
        gapi.load('client:auth2', initializeGoogle)
      }
      return result
    }
    default:
      return result
  }
}: Middleware<State, AnyAction>)
