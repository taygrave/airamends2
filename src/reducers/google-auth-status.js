// @flow
import {
  type AnyAction,
  type GoogleAuthStatusState as State
} from '../types'

export default (state: State = { isSignedIn: false }, action: AnyAction): State => {
  switch (action.type) {
    case 'UPDATE_AUTH_STATUS': {
      const { isSignedIn } = action
      return {
        ...state,
        isSignedIn
      }
    }
    default:
      return state
  }
}

export const getAuthStatus = (state: State) => state
