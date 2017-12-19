// @flow
/* globals Dispatch */

import { type AnyAction } from '../types'

export const initAuthGoogle = () => async (dispatch: Dispatch<AnyAction>) => {
  return dispatch({
    type: 'INIT_AUTH_GOOGLE'
  })
}
