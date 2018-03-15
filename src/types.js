// @flow

// /* eslint-disable no-unused-vars */
// // ExtractReturn follows suggestion from https://hackernoon.com/redux-flow-type-getting-the-maximum-benefit-from-the-fewest-key-strokes-5c006c54ec87
// type _ExtractReturn<B, F: (*) => B> = B
// export type ExtractReturn<F> = _ExtractReturn<*, F>

export type Element = string | React$Element<any> | Array<React$Element<any>>

// REACT ACTIONS
export type AuthGoogle = {
  type: 'AUTH_GOOGLE'
}

export type ToggleGoogleSignin = {
  type: 'TOGGLE_GOOGLE_SIGNIN',
}

export type UpdatedAuthStatus = {
  type: 'TOGGLED_GOOGLE_SIGNIN',
  isAuthed: boolean
}

export type AnyAction =
  AuthGoogle |
  ToggleGoogleSignin |
  UpdatedAuthStatus

// STATES

export type GoogleAuthStatusState = {
  isAuthed: boolean
}

export type State = {
  googleAuthStatus: GoogleAuthStatusState
}
