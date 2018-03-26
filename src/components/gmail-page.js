// @flow
import React from 'react'
import { Button } from 'react-bootstrap'

import { fetchEmails } from '../actions'

type Props = {
  fetchEmails: typeof fetchEmails
}

const GmailPage = (props: Props) => {
  const {
    fetchEmails
  } = props

  return (
    <div className='gmail-page'>
      <Button className='gmail-btn' bsStyle='info' onClick={fetchEmails}>Query Inbox!</Button>
    </div>
  )
}

export default GmailPage
