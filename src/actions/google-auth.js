// @flow
/* globals Dispatch */

import { type AnyAction } from '../types'

export const authGoogle = () => (dispatch: Dispatch<AnyAction>) =>
dispatch({ type: 'AUTH_GOOGLE' })

export const toggleGoogleSignin = () => (dispatch: Dispatch<AnyAction>) =>
dispatch({ type: 'TOGGLE_GOOGLE_SIGNIN' })

type ToggledGoogleSigninArgs = { isAuthed: boolean }
export const toggledGoogleSignin = ({ isAuthed }: ToggledGoogleSigninArgs) => (dispatch: Dispatch<AnyAction>) =>
dispatch({
  type: 'TOGGLED_GOOGLE_SIGNIN',
  isAuthed
})
