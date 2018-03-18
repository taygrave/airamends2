// @flow
import React from 'react'

import {
  authGoogle,
  toggleGoogleSignin
} from '../actions'

type Props = {
  authGoogle: typeof authGoogle,
  isAuthedGoogle: boolean,
  isSignedInToGoogle: boolean,
  toggleGoogleSignin: typeof toggleGoogleSignin
}

const AuthButton = (props: Props) => {
  const {
    isAuthedGoogle,
    isSignedInToGoogle
  } = props

  const handleAuthClick = () => {
    const {
      authGoogle,
      isAuthedGoogle,
      toggleGoogleSignin
    } = props

    if (isAuthedGoogle) {
      toggleGoogleSignin()
    } else {
      authGoogle()
    }
  }

  return (
    <button
      className='btn'
      onClick={handleAuthClick}
    >
      {!isAuthedGoogle
        ? 'Authorize'
        : isSignedInToGoogle
          ? 'Sign Out'
          : 'Sign In'
      }
    </button>
  )
}

export default AuthButton
