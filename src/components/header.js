// @flow
import React from 'react'

import AuthButton from './auth-button'
import UserInfo from './user-info'

import type { HomeProps } from './home-page'

const Header = (props: HomeProps) => {
  const {
    googleUser,
    isSignedInToGoogle
  } = props

  return (
    <div className='header'>
      <div>
        <h1>Air Amends 2</h1>
        <AuthButton {...props} />
      </div>
      {isSignedInToGoogle
        ? <UserInfo {...googleUser} />
        : null
      }
    </div>
  )
}

export default Header
