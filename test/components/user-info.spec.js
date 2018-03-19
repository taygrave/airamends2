// @flow
import assert from 'assert'
import { shallow } from 'enzyme'
import React from 'react'
import { Image } from 'react-bootstrap'

import UserInfo from '../../src/components/user-info'

describe('UserInfo', () => {
  const user = {
    avatarUrl: 'me.img',
    email: 'me@me.com',
    firstName: 'Tay',
    lastName: 'Hess',
    name: 'Tay Hess'
  }
  const render = (props) => {
    const withDefaults = {
      ...user,
      ...props
    }

    return shallow(<UserInfo {...withDefaults} />)
  }

  it('renders w/ defaults', () => {
    const wrapper = render()
    const userInfo = wrapper.find('.user-info')
    const userInfoText = userInfo.text()
    const avatar = wrapper.find(Image)

    assert(userInfo.exists())
    assert(avatar.exists())
    assert(userInfoText.includes(user.email))
    assert(userInfoText.includes(user.name))
    assert(avatar.props().circle)
    assert.equal(avatar.props().src, user.avatarUrl)
  })
})
