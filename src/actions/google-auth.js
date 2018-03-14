// @flow
/* globals Dispatch */

import { type AnyAction } from '../types'

export const authGoogle = () => (dispatch: Dispatch<AnyAction>) =>
dispatch({
  type: 'AUTH_GOOGLE'
})

type UpdateAuthStatusArgs = { newStatus: boolean }
export const updateAuthStatus = ({ newStatus }: UpdateAuthStatusArgs) => (dispatch: Dispatch<AnyAction>) =>
dispatch({
  type: 'UPDATE_AUTH_STATUS',
  newStatus
})
