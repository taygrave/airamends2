// @flow
/* globals Dispatch */
import gapi from 'gapi-client'
import lodash from 'lodash'

import type { AnyAction } from '../types'

const { chunk } = lodash

const gmailQuery = `
  from:(-me)
  subject: hello
  `
// from:(-me) subject:(-fwd -re -fw -check) itinerary, confirmation, flight, number, departure, taxes
const gmailClient = gapi.client.gmail.users.messages

const gmailRequest = ({ id }) =>
gmailClient.get({
  userId: 'me',
  id,
  format: 'raw'
})

export const fetchEmails = () => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: 'FETCH_EMAILS' })
  const { result: { messages } } = await gmailClient.list({
    userId: 'me',
    q: gmailQuery
  })
  // TODO: figure out how to force the batches to work, might need to get messages w/ next page tokens or what not, seems to only be returning 100 max anyway
  console.log('messages', messages);
  // filter for those where msg_id = thread_id to ensure its the root email
  const rootMessages = messages.filter(({id, threadId}) => id === threadId)
  // chunk into sizes of 100 to comply w/ gmail batch request limits
  const chunkMessages = chunk(rootMessages, 100)
  console.log('chunks', chunkMessages);

  const batch = gapi.client.newBatch()
  for (let chunk of chunkMessages) {
    for (let msg of chunk) {
      batch.add(gmailRequest(msg))
    }

    try {
      await batch.execute((response) => {
        console.log('response', response)
        // TODO: then what about the dispatch? assuming it will dispatch multiple times, need to confirm and handle it
        dispatch({
          type: 'FETCHED_GOOGLE_EMAILS',
          response
        })
      })
    } catch (e) {
      console.log('GMAIL ERROR:', e)
    }
  }
}
