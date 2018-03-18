// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthButton from './auth-button'
import {
  authGoogle,
  initGoogle,
  toggleGoogleSignin
} from '../actions'
import {
  getAuthStatus,
  getSigninStatus
} from '../selectors'

type Props = {
  authGoogle: typeof authGoogle,
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
    return (
      <div className='home'>
        <h1>Air Amends 2</h1>
        <AuthButton {...this.props} />
      </div>
    )
  }
}

export const Unconnected = HomePage

export default connect(
  (state) => ({
    isAuthedGoogle: getAuthStatus(state),
    isSignedInToGoogle: getSigninStatus(state)
  }),
  {
    authGoogle,
    initGoogle,
    toggleGoogleSignin
  }
)(HomePage)
