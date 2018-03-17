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
      const googleAuth = gapi.auth2.getAuthInstance()
      // Listen for sign-in state changes.
      googleAuth.isSignedIn.listen((toggleGoogleSignin))
    } catch (e) {
      console.log('ERROR', e)
    }
  }

  if (action.type === 'INIT_GOOGLE' && !isAuthed) {
    gapi.load('client:auth2', initializeGoogle)
  }

  return result
}: Middleware<State, AnyAction>)
