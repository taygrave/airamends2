// @flow
import React, { Component } from 'react'
import { Switch, NavLink, Route } from 'react-router-dom'

import HomePage from './HomePage'
import NotFoundPage from './NotFoundPage'

import type { Element } from '../types'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
type Props = {
  children?: Element
}

class App extends Component<Props, {}> {
  render () {
    return (
      <div className='root'>
        <div className='navbar'>
          <NavLink exact to='/'>Home</NavLink>
        </div>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    )
  }
}

export default App
