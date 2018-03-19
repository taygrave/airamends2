// @flow
import gapi from 'gapi-client'
import { type Middleware } from 'redux'

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
    } catch (e) {
      console.log('ERROR', e)
    }
  }

  if (action.type === 'INIT_GOOGLE' && !isAuthed) {
    gapi.load('client:auth2', initializeGoogle)
  }

  return result
}: Middleware<State, AnyAction>)
