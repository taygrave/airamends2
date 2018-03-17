// @flow

// /* eslint-disable no-unused-vars */
// // ExtractReturn follows suggestion from https://hackernoon.com/redux-flow-type-getting-the-maximum-benefit-from-the-fewest-key-strokes-5c006c54ec87
// type _ExtractReturn<B, F: (*) => B> = B
// export type ExtractReturn<F> = _ExtractReturn<*, F>

export type Element = string | React$Element<any> | Array<React$Element<any>>

// ACTIONS
export type Init = { type: '@@INIT' }

export type AuthGoogle = { type: 'AUTH_GOOGLE' }

export type AuthedGoogle = { type: 'AUTHED_GOOGLE' }

export type InitGoogle = { type: 'INIT_GOOGLE' }

export type ToggleGoogleSignin = { type: 'TOGGLE_GOOGLE_SIGNIN' }

export type UpdatedAuthStatus = { type: 'TOGGLED_GOOGLE_SIGNIN' }

export type AnyAction =
  Init |
  AuthGoogle |
  AuthedGoogle |
  InitGoogle |
  ToggleGoogleSignin |
  UpdatedAuthStatus

// STATES
export type GoogleAuthStatusState = {
  isAuthed: boolean,
  isSignedIn: boolean
}

export type State = {
  googleStatus: GoogleAuthStatusState
}
