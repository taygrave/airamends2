// @flow
import assert from 'assert'
import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'react-bootstrap'
import sinon from 'sinon'

import AuthButton from '../../src/components/auth-button'

describe('AuthButton', () => {
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

    return shallow(<AuthButton {...withDefaults} />)
  }

  it('renders w/ defaults', () => {
    const wrapper = render()
    const button = wrapper.find(Button)

    assert(button.exists())
    assert.equal(button.props().bsStyle, 'info')
    assert.equal(button.props().children, 'Authorize')
  })

  it('renders correct Button when authed but signed out', () => {
    const props = {
      isAuthedGoogle: true,
      isSignedInToGoogle: false
    }
    const wrapper = render(props)
    const button = wrapper.find(Button)

    assert(button.exists())
    assert.equal(button.props().bsStyle, 'success')
    assert.equal(button.props().children, 'Sign In')
  })

  it('renders correct Button when signed in', () => {
    const props = {
      isAuthedGoogle: true,
      isSignedInToGoogle: true
    }
    const wrapper = render(props)
    const button = wrapper.find(Button)

    assert(button.exists())
    assert.equal(button.props().bsStyle, 'danger')
    assert.equal(button.props().children, 'Sign Out')
  })

  it('onClick of button calls authGoogle() if not authed', () => {
    const authGoogle = sinon.spy()
    const toggleGoogleSignin = sinon.spy()
    const wrapper = render({ authGoogle, toggleGoogleSignin })
    const button = wrapper.find(Button)

    assert(button.exists())
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
    const button = wrapper.find(Button)

    assert(button.exists())
    button.simulate('click')
    assert(authGoogle.notCalled)
    assert(toggleGoogleSignin.calledOnce)
  })
})
