// @flow

// /* eslint-disable no-unused-vars */
// // ExtractReturn follows suggestion from https://hackernoon.com/redux-flow-type-getting-the-maximum-benefit-from-the-fewest-key-strokes-5c006c54ec87
// type _ExtractReturn<B, F: (*) => B> = B
// export type ExtractReturn<F> = _ExtractReturn<*, F>

export type Element = string | React$Element<any> | Array<React$Element<any>>

export type GoogleUser = {
  avatarUrl: string,
  email: string,
  firstName: string,
  lastName: string,
  name: string
}

// ACTIONS
export type Init = { type: '@@INIT' }
export type AuthedGoogle = { type: 'AUTHED_GOOGLE' }
export type ReceivedGoogleUser = GoogleUser & {
  type: 'FETCHED_GOOGLE_USER'
}
export type ToggledGoogleSignin = { type: 'TOGGLED_GOOGLE_SIGNIN' }

export type AnyAction =
  Init |
  AuthedGoogle |
  ReceivedGoogleUser |
  ToggledGoogleSignin

// STATES
export type GoogleAuthStatusState = {
  isAuthed: boolean,
  isSignedIn: boolean
}

export type GoogleUserState = {} | GoogleUser

export type State = {
  googleStatus: GoogleAuthStatusState
}
