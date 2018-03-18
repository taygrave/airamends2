// @flow
import assert from 'assert'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { Unconnected as HomePage } from '../../src/components/home-page'
import AuthButton from '../../src/components/auth-button'

describe('HomePage', () => {
  const defaultActions = {
    authGoogle: (() => {}: any),
    initGoogle: (() => {}: any),
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
    assert(wrapper.find(AuthButton).exists())
  })

  it('calls initGoogle on componentWillMount', () => {
    const initGoogle = sinon.spy()
    render({ initGoogle })

    assert(initGoogle.calledOnce)
  })
})
