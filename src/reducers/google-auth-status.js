// @flow
import {
  type AnyAction,
  type GoogleAuthStatusState as State
} from '../types'

export const getAuthStatus = (state: State) => state.isAuthed

export default (state: State = { isAuthed: false }, action: AnyAction): State => {
  switch (action.type) {
    case 'TOGGLED_GOOGLE_SIGNIN': {
      const { isAuthed } = action

      return {
        ...state,
        isAuthed
      }
    }
    default:
      return state
  }
}

// concerns: how do we know it worked? need another 'TOGGLED_GOOGLE_SIGNIN' or something
