// @flow
import assert from 'assert'
import { shallow } from 'enzyme'
import React from 'react'

import AuthButton from '../../src/components/auth-button'
import Header from '../../src/components/header'
import UserInfo from '../../src/components/user-info'

describe('Header', () => {
  const defaultActions = {
    authGoogle: (() => {}: any),
    fetchEmails: (() => {}: any),
    initGoogle: (() => {}: any),
    toggleGoogleSignin: (() => {}: any)
  }

  const render = (props) => {
    const withDefaults = {
      googleUser: {},
      isAuthedGoogle: false,
      isSignedInToGoogle: false,
      ...defaultActions,
      ...props
    }

    return shallow(<Header {...withDefaults} />)
  }

  it('renders w/ defaults', () => {
    const wrapper = render()

    assert(wrapper.find('.header').exists())
    assert(wrapper.find(AuthButton).exists())
    assert(!wrapper.find(UserInfo).exists())
  })

  it('renders w/ UserInfo if signed in', () => {
    const wrapper = render({
      isSignedInToGoogle: true
    })

    assert(wrapper.find(UserInfo).exists())
  })
})
