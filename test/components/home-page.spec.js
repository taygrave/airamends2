// @flow
import assert from 'assert'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { Unconnected as HomePage } from '../../src/components/home-page'
import GmailPage from '../../src/components/gmail-page'
import Header from '../../src/components/header'

describe('HomePage', () => {
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

    return shallow(<HomePage {...withDefaults} />)
  }

  it('renders w/ defaults', () => {
    const wrapper = render()

    assert(wrapper.find('.home').exists())
    assert(wrapper.find(Header).exists())
    assert(!wrapper.find(GmailPage).exists())
  })

  it('renders w/ GmailPage if signed in', () => {
    const wrapper = render({
      isSignedInToGoogle: true
    })

    assert(wrapper.find(GmailPage).exists())
  })

  it('calls initGoogle on componentWillMount', () => {
    const initGoogle = sinon.spy()
    render({ initGoogle })

    assert(initGoogle.calledOnce)
  })
})
