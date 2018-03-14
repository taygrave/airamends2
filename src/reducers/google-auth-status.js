// @flow
import {
  type AnyAction,
  type GoogleAuthStatusState as State
} from '../types'

export const getAuthStatus = (state: State) => state.isSignedIn

export default (state: State = { isSignedIn: false }, action: AnyAction): State => {
  switch (action.type) {
    case 'UPDATE_AUTH_STATUS': {
      const { newStatus } = action

      return {
        ...state,
        isSignedIn: newStatus
      }
    }
    default:
      return state
  }
}

// concerns: how do we know it worked? need another 'UPDATED_AUTH_STATUS' or something
