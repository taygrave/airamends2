// @flow
import React, { Component } from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'

import App from './App'

type Props = {
  store: Object,
  history: Object
}
// TODO: update the types above to be legit

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
