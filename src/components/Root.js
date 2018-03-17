// @flow
import React, { Component } from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'

import App from './app'

type Props = {
  store: Object,
  history: Object
}
// TODO: update the types of 'store' and 'history' to be legit types

export default class Root extends Component<Props, {}> {
  render () {
    const { store, history } = this.props

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    )
  }
}
