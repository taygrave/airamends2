// @flow
/* globals Dispatch */
import gapi from 'gapi-client'

import type { AnyAction, State } from '../types'

export const authGoogle = () => (dispatch: Dispatch<AnyAction>) =>
dispatch({ type: 'AUTH_GOOGLE' })

export const authedGoogle = () => (dispatch: Dispatch<AnyAction>) =>
dispatch({ type: 'AUTHED_GOOGLE' })

export const toggleGoogleSignin = () =>
(dispatch: Dispatch<AnyAction>, getState: () => State) => {
  dispatch({ type: 'TOGGLE_GOOGLE_SIGNIN' })
  const { googleStatus: { isSignedIn } } = getState()

  try {
    if (isSignedIn) {
      gapi.auth2.getAuthInstance().signOut()
    } else {
      gapi.auth2.getAuthInstance().signIn()
    }

    dispatch(toggledGoogleSignin())
  } catch (e) {
    console.log('ERROR', e)
  }
}

export const toggledGoogleSignin = () => (dispatch: Dispatch<AnyAction>) =>
dispatch({ type: 'TOGGLED_GOOGLE_SIGNIN' })
