// @flow
/* globals Dispatch */
import gapi from 'gapi-client'

import { fetchGoogleUser } from './google-user'

import type { AnyAction, State } from '../types'

export const initGoogle = () => (dispatch: Dispatch<AnyAction>) =>
dispatch({ type: 'INIT_GOOGLE' })

export const authGoogle = () => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: 'AUTH_GOOGLE' })
  try {
    await gapi.auth2.getAuthInstance().signIn()
    dispatch({ type: 'AUTHED_GOOGLE' })
    dispatch(fetchGoogleUser())
  } catch (e) {
    console.log('AUTH ERROR', e)
  }
}

export const toggleGoogleSignin = () =>
async (dispatch: Dispatch<AnyAction>, getState: () => State) => {
  dispatch({ type: 'TOGGLE_GOOGLE_SIGNIN' })
  const { googleStatus: { isSignedIn } } = getState()

  try {
    if (isSignedIn) {
      await gapi.auth2.getAuthInstance().signOut()
    } else {
      await gapi.auth2.getAuthInstance().signIn()
    }

    dispatch({ type: 'TOGGLED_GOOGLE_SIGNIN' })
  } catch (e) {
    console.log('TOGGLE SIGN ON ERROR', e)
  }
}
