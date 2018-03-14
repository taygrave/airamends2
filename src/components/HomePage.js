// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  authGoogle,
  updateAuthStatus
} from '../actions'
import {
  getAuthStatus
} from '../selectors'

type Props = {
  authGoogle: typeof authGoogle,
  isGoogleAuthed: boolean,
  updateAuthStatus: typeof updateAuthStatus
}

class HomePage extends Component<Props> {
  handleAuthClick = () => {
    const {
      authGoogle,
      isGoogleAuthed,
      updateAuthStatus
    } = this.props

    if (isGoogleAuthed) {
      updateAuthStatus({ newStatus: !isGoogleAuthed })
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
    updateAuthStatus
  }
)(HomePage)
