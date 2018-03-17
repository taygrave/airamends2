// @flow
import assert from 'assert'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { Unconnected as HomePage } from '../../src/components/home-page'

describe('HomePage', () => {
  const defaultActions = {
    authGoogle: (() => {}: any),
    toggleGoogleSignin: (() => {}: any)
  }

  const render = (props) => {
    const withDefaults = {
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
    assert(wrapper.find('.btn').exists())

    const buttonText = wrapper.find('.btn').text()
    assert.equal(buttonText, 'Authorize')
  })

  it('renders correct button text when authed but signed out', () => {
    const props = {
      isAuthedGoogle: true,
      isSignedInToGoogle: false
    }
    const wrapper = render(props)
    assert(wrapper.find('.home').exists())

    const buttonText = wrapper.find('.btn').text()
    assert.equal(buttonText, 'Sign In')
  })

  it('renders correct button text when signed in', () => {
    const props = {
      isAuthedGoogle: true,
      isSignedInToGoogle: true
    }
    const wrapper = render(props)
    assert(wrapper.find('.home').exists())

    const buttonText = wrapper.find('.btn').text()
    assert.equal(buttonText, 'Sign Out')
  })

  it('onClick of button calls authGoogle() if not authed', () => {
    const authGoogle = sinon.spy()
    const toggleGoogleSignin = sinon.spy()
    const wrapper = render({ authGoogle, toggleGoogleSignin })
    assert(wrapper.find('.home').exists())

    const button = wrapper.find('.btn')
    button.simulate('click')
    assert(authGoogle.calledOnce)
    assert(toggleGoogleSignin.notCalled)
  })

  it('onClick of button calls toggleGoogleSignin() if authed', () => {
    const authGoogle = sinon.spy()
    const toggleGoogleSignin = sinon.spy()
    const props = {
      isAuthedGoogle: true,
      authGoogle,
      toggleGoogleSignin
    }
    const wrapper = render(props)
    assert(wrapper.find('.home').exists())

    const button = wrapper.find('.btn')
    button.simulate('click')
    assert(authGoogle.notCalled)
    assert(toggleGoogleSignin.calledOnce)
  })
})
