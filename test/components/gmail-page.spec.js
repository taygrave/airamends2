// @flow
import assert from 'assert'
import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'react-bootstrap'
import sinon from 'sinon'

import GmailPage from '../../src/components/gmail-page'

describe('GmailPage', () => {
  const defaultActions = {
    fetchEmails: (() => {}: any)
  }

  const render = (props) => {
    const withDefaults = {
      googleUser: {},
      isAuthedGoogle: false,
      isSignedInToGoogle: false,
      ...defaultActions,
      ...props
    }

    return shallow(<GmailPage {...withDefaults} />)
  }

  it('renders w/ defaults', () => {
    const wrapper = render()

    assert(wrapper.find('.gmail-page').exists())
  })

  it('onClick of button calls fetchEmails()', () => {
    const fetchEmails = sinon.spy()
    const wrapper = render({ fetchEmails })
    const button = wrapper.find(Button)

    assert(button.exists())
    button.simulate('click')
    assert(fetchEmails.calledOnce)
  })
})
