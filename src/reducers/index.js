// @flow
import { combineReducers } from 'redux'

import googleAuthStatus from './google-auth-status'

const rootReducer = combineReducers({
  googleAuthStatus
})

export default rootReducer
