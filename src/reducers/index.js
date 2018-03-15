// @flow
import { combineReducers } from 'redux'

import googleStatus, * as fromGoogleStatus from './google-status'

import { type State } from '../types'

const rootReducer = combineReducers({
  googleStatus
})

export default rootReducer

// SELECTORS: coupled to the state shape
// practice as recommended by https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers
export const getAuthStatus = (state: State) =>
  fromGoogleStatus.getAuthStatus(state.googleStatus)

export const getSigninStatus = (state: State) =>
  fromGoogleStatus.getSigninStatus(state.googleStatus)
