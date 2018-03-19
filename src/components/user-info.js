// @flow
import React from 'react'
import { Image } from 'react-bootstrap'

import type { GoogleUser } from '../types'

type Props = GoogleUser

const UserInfo = ({
  avatarUrl,
  email,
  firstName,
  lastName,
  name
}: Props) => (
  <div className='user-info'>
    <Image className='avatar' src={avatarUrl} circle />
    <div>Welcome {name}!</div>
    <div>{email}</div>
  </div>
)

export default UserInfo
