// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './header'
import GmailPage from './gmail-page'
import {
  authGoogle,
  fetchEmails,
  initGoogle,
  toggleGoogleSignin
} from '../actions'
import {
  getAuthStatus,
  getSigninStatus
} from '../selectors'

import type { GoogleUser } from '../types'

export type HomeProps = {
  authGoogle: typeof authGoogle,
  fetchEmails: typeof fetchEmails,
  googleUser: GoogleUser | {},
  initGoogle: typeof initGoogle,
  isAuthedGoogle: boolean,
  isSignedInToGoogle: boolean,
  toggleGoogleSignin: typeof toggleGoogleSignin
}

class HomePage extends Component<HomeProps> {
  componentWillMount () {
    this.props.initGoogle()
  }

  render () {
    const { isSignedInToGoogle } = this.props

    return (
      <div className='home'>
        <Header {...this.props} />
        {isSignedInToGoogle
          ? <GmailPage {...this.props} />
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
    fetchEmails,
    initGoogle,
    toggleGoogleSignin
  }
)(HomePage)
