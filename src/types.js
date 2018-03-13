// @flow

// /* eslint-disable no-unused-vars */
// // ExtractReturn follows suggestion from https://hackernoon.com/redux-flow-type-getting-the-maximum-benefit-from-the-fewest-key-strokes-5c006c54ec87
// type _ExtractReturn<B, F: (*) => B> = B
// export type ExtractReturn<F> = _ExtractReturn<*, F>

export type Element = string | React$Element<any> | Array<React$Element<any>>

// REACT ACTIONS
export type UpdateAuthStatus = {
  type: 'UPDATE_AUTH_STATUS',
  isSignedIn: boolean
}

export type AnyAction =
  UpdateAuthStatus

// STATES

export type GoogleAuthStatusState = {
  isSignedIn: boolean
}

export type State = {
  googleAuthStatus: GoogleAuthStatusState
}
