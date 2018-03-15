// @flow
import {
  type AnyAction,
  type GoogleAuthStatusState as State
} from '../types'

export const getAuthStatus = (state: State) => state.isAuthed
export const getSigninStatus = (state: State) => state.isSignedIn

const initialState = {
  isAuthed: false,
  isSignedIn: false
}
export default (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case 'AUTHED_GOOGLE': {
      return {
        ...state,
        isAuthed: true,
        isSignedIn: true
      }
    }
    case 'TOGGLED_GOOGLE_SIGNIN': {
      return {
        ...state,
        isSignedIn: !state.isSignedIn
      }
    }
    default:
      return state
  }
}
