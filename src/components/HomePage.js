// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { initAuthGoogle } from '../actions'

type Props = {
  initAuthGoogle: typeof initAuthGoogle
}

class HomePage extends Component<Props, {}> {
  authGoogle = () => {
    const { initAuthGoogle } = this.props

    initAuthGoogle()
  }

  render () {
    return (
      <div>
        <h1>Air Amends 2222</h1>
        <button onClick={this.authGoogle}>
          Click Me
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
