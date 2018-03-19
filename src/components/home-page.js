// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthButton from './auth-button'
import UserInfo from './user-info'
import {
  authGoogle,
  initGoogle,
  toggleGoogleSignin
} from '../actions'
import {
  getAuthStatus,
  getSigninStatus
} from '../selectors'

import type { GoogleUser } from '../types'

type Props = {
  authGoogle: typeof authGoogle,
  googleUser: GoogleUser | {},
  initGoogle: typeof initGoogle,
  isAuthedGoogle: boolean,
  isSignedInToGoogle: boolean,
  toggleGoogleSignin: typeof toggleGoogleSignin
}

class HomePage extends Component<Props> {
  componentWillMount () {
    const {
      initGoogle
    } = this.props

    initGoogle()
  }

  render () {
    const {
      googleUser,
      isSignedInToGoogle
    } = this.props

    return (
      <div className='home'>
        <div>
          <h1>Air Amends 2</h1>
          <AuthButton {...this.props} />
        </div>
        {isSignedInToGoogle
          ? <UserInfo {...googleUser} />
          : null
        }
      </div>
    )
  }
}

export const Unconnected = HomePage

export default connect(
  (state) => ({
    googleUser: state.googleUser,
    isAuthedGoogle: getAuthStatus(state),
    isSignedInToGoogle: getSigninStatus(state)
  }),
  {
    authGoogle,
    initGoogle,
    toggleGoogleSignin
  }
)(HomePage)
