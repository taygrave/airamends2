// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  authGoogle,
  toggleGoogleSignin
} from '../actions'
import {
  getAuthStatus
} from '../selectors'

type Props = {
  authGoogle: typeof authGoogle,
  isGoogleAuthed: boolean,
  toggleGoogleSignin: typeof toggleGoogleSignin
}

class HomePage extends Component<Props> {
  handleAuthClick = () => {
    const {
      authGoogle,
      isGoogleAuthed,
      toggleGoogleSignin
    } = this.props

    if (isGoogleAuthed) {
      toggleGoogleSignin()
    } else {
      authGoogle()
    }
  }

  render () {
    const { isGoogleAuthed } = this.props

    return (
      <div className='home'>
        <h1>Air Amends 2</h1>
        <button
          className='btn'
          onClick={this.handleAuthClick}
        >
          {isGoogleAuthed ? 'Sign Out' : 'Authorize'}
        </button>
      </div>
    )
  }
}

export const Unconnected = HomePage

export default connect(
  (state) => ({
    isGoogleAuthed: getAuthStatus(state)
  }),
  {
    authGoogle,
    toggleGoogleSignin
  }
)(HomePage)
