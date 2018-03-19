// @flow
import {
  type AnyAction,
  type GoogleUserState as State
} from '../types'

export default (state: State = {}, action: AnyAction): State => {
  switch (action.type) {
    case 'RECEIVED_GOOGLE_USER': {
      const {
        avatarUrl,
        email,
        firstName,
        lastName,
        name
      } = action
      return {
        avatarUrl,
        email,
        firstName,
        lastName,
        name
      }
    }
    default:
      return state
  }
}
