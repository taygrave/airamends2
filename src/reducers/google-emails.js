// @flow
import {
  type AnyAction,
  type GoogleEmailState as State
} from '../types'

export default (state: State = {}, action: AnyAction): State => {
  switch (action.type) {
    case 'FETCH_EMAILS': {
      return {
        ...state,
        loading: true
      }
    }
    case 'FETCHED_EMAILS': {
      const { response, thisChunk, totalChunks } = action
      return {
        ...state,
        ...response,
        loading: thisChunk !== totalChunks
      }
    }
    default:
      return state
  }
}
