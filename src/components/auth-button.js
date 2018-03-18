// @flow
import React from 'react'
import { Button } from 'react-bootstrap'

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

const AuthButton = ({
  authGoogle,
  isAuthedGoogle,
  isSignedInToGoogle,
  toggleGoogleSignin
}: Props) => !isAuthedGoogle
  ? <Button className='auth-button' bsStyle='info' onClick={authGoogle}>Authorize</Button>
  : isSignedInToGoogle
    ? <Button className='auth-button' bsStyle='danger' onClick={toggleGoogleSignin}>Sign Out</Button>
    : <Button className='auth-button' bsStyle='success' onClick={toggleGoogleSignin}>Sign In</Button>

export default AuthButton
