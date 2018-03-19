// @flow
import assert from 'assert'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { Unconnected as HomePage } from '../../src/components/home-page'
import AuthButton from '../../src/components/auth-button'
import UserInfo from '../../src/components/user-info'

describe('HomePage', () => {
  const defaultActions = {
    authGoogle: (() => {}: any),
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

    return shallow(<HomePage {...withDefaults} />)
  }

  it('renders w/ defaults', () => {
    const wrapper = render()

    assert(wrapper.find('.home').exists())
    assert(wrapper.find(AuthButton).exists())
    assert(!wrapper.find(UserInfo).exists())
  })

  it('renders w/ UserInfo if signed in', () => {
    const wrapper = render({
      isSignedInToGoogle: true
    })

    assert(wrapper.find(UserInfo).exists())
  })

  it('calls initGoogle on componentWillMount', () => {
    const initGoogle = sinon.spy()
    render({ initGoogle })

    assert(initGoogle.calledOnce)
  })
})
