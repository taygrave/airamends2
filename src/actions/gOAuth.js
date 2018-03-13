// @flow
/* globals Dispatch */

import { type AnyAction } from '../types'

export const updateAuthStatus = (isSignedIn: boolean) => (dispatch: Dispatch<AnyAction>) => {
  return dispatch({
    type: 'UPDATE_AUTH_STATUS',
    isSignedIn
  })
}
