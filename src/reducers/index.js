// @flow
import { combineReducers } from 'redux'

import googleAuthStatus, * as fromGoogleAuthStatus from './google-auth-status'

import { type State } from '../types'

const rootReducer = combineReducers({
  googleAuthStatus
})

export default rootReducer

// SELECTORS: coupled to the state shape
// practice as recommended by https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers
export const getAuthStatus = (state: State) =>
  fromGoogleAuthStatus.getAuthStatus(state.googleAuthStatus)
