// @flow
/* globals Dispatch */
import gapi from 'gapi-client'

import type { AnyAction, State } from '../types'

export const initGoogle = () => (dispatch: Dispatch<AnyAction>) =>
dispatch({ type: 'INIT_GOOGLE' })

export const authGoogle = () => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: 'AUTH_GOOGLE' })
  await gapi.auth2.getAuthInstance().signIn()

  dispatch(authedGoogle())
}

export const authedGoogle = () => (dispatch: Dispatch<AnyAction>) =>
dispatch({ type: 'AUTHED_GOOGLE' })

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

    dispatch(toggledGoogleSignin())
  } catch (e) {
    console.log('ERROR', e)
  }
}

export const toggledGoogleSignin = () => (dispatch: Dispatch<AnyAction>) =>
dispatch({ type: 'TOGGLED_GOOGLE_SIGNIN' })
