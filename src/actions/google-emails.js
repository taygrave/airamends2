// @flow
/* globals Dispatch */
import gapi from 'gapi-client'
import lodash from 'lodash'

import type { AnyAction } from '../types'

const { chunk } = lodash

const gmailQuery = `
  from:(-me)
  from:(-me) subject:(-fwd -re -fw -check) itinerary, confirmation, flight, number, departure, taxes
  `

const gmailListRequest = (gmailClient, pageToken: string) =>
gmailClient.list({
  userId: 'me',
  q: gmailQuery,
  pageToken: pageToken === 'first' ? undefined : pageToken
})

const gmailGetMessageRequest = ({ gmailClient, id }) =>
gmailClient.get({
  userId: 'me',
  id,
  format: 'raw'
})

export const fetchEmails = () => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: 'FETCH_EMAILS' })
  const gmailClient = gapi.client.gmail.users.messages
  let allMessages = []
  let pageToken = 'first' // hack, initialized to make first request sans a pageToken since not needed on first request

  try {
    while (pageToken) {
      const { result: { messages, nextPageToken } } = await gmailListRequest(
        gmailClient, pageToken
      )

      allMessages = allMessages.concat(messages)
      pageToken = nextPageToken
    }

    // filter where msg_id = thread_id to ensure its the root email
    const rootMessages = allMessages.filter(({ id, threadId }) => id === threadId)
    // chunk into sizes of 100 to comply w/ gmail batch request limits
    const chunkMessages = chunk(rootMessages, 100)
    const chunkLength = chunkMessages.length
    const batch = gapi.client.newBatch()

    for (let i = 0; i < chunkLength; i++) {
      const chunk = chunkMessages[i]
      for (let msg of chunk) {
        batch.add(gmailGetMessageRequest({ gmailClient, id: msg.id }))
      }

      await batch.execute((response) => {
        dispatch({
          type: 'FETCHED_EMAILS',
          thisChunk: i + 1,
          totalChunks: chunkLength,
          response
        })
      })
    }
  } catch (e) {
    console.log('GMAIL ERROR:', e)
  }
}
