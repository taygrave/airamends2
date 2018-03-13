// @flow
import gapi from 'gapi-client'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { initAuthGoogle } from '../actions'
import {
  googleClientId,
  googleDiscoveryDocs,
  googleScopes
} from '../config'

type Props = {
  initAuthGoogle: typeof initAuthGoogle
}

type State = {
  isSignedIn: boolean
}

class HomePage extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      isSignedIn: false
    }
  }

  componentDidMount () {
    gapi.load('client:auth2', this.initializeGoogle)
  }

  initializeGoogle = async () => {
    try {
      await gapi.client.init({
        discoveryDocs: googleDiscoveryDocs,
        clientId: googleClientId,
        scope: googleScopes
      })

      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus)

      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
    } catch (e) {
      console.log('ERROR', e)
    }
  }

  updateSigninStatus = (isSignedIn: boolean) => {
    this.setState({ isSignedIn })
  }

  handleAuthClick = () => {
    const { isSignedIn } = this.state
    if (isSignedIn) {
      gapi.auth2.getAuthInstance().signOut()
    } else {
      gapi.auth2.getAuthInstance().signIn()
    }
  }

  render () {
    const { isSignedIn } = this.state

    return (
      <div className='home'>
        <h1>Air Amends 2222</h1>
        <button
          className='btn'
          onClick={this.handleAuthClick}
        >
          {isSignedIn ? 'Sign Out' : 'Authorize'}
        </button>
      </div>
    )
  }
}

export const Unconnected = HomePage

export default connect(
  () => ({}),
  {
    initAuthGoogle
  }
)(HomePage)
