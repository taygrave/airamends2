// @flow
import assert from 'assert'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { fetchEmails } from '../../src/actions'

// generate an array of 200 mock emails to be returned
const uniqueEmails = Array.from(new Array(200), (val, index) => (
  { id: index, threadId: index }
))
// generate an array of 100 mock duplicate emails on the same thread
// to be filtered out of the return
const duplicateEmails = Array.from(new Array(100), (val, index) => (
  { id: index, threadId: 999 }
))
const mockEmails = uniqueEmails.concat(duplicateEmails)

const mockList = {
  result: {
    messages: mockEmails,
    nextPageToken: null
  }
}
const mockExecute = jest.fn()
const mockGet = jest.fn()
jest.mock('gapi-client', () => {
  return {
    client: {
      newBatch: () => ({
        add: () => jest.fn(),
        execute: (fn) => mockExecute(fn)
      }),
      gmail: {
        users: {
          messages: {
            get: (params) => mockGet(params),
            list: () => mockList
          }
        }
      }
    }
  }
})

const mockStore = configureStore([ thunk ])

describe('Actions: Google User', () => {
  afterEach(() => {
    mockExecute.mockClear()
    mockGet.mockClear()
  })

  it('fetchEmails() dispatches, filters messages correctly, chunks correctly, batch executes', async () => {
    // mockEmails.length === 300, after filtering and batching in 100s for gapi limit
    // we will expect to see two chunks, and two FETCHED_EMAILS dispatches
    const store = mockStore({})
    // NOTE: due to mocking the `response` bodies here do not resemble the actual responses.
    const expected = [
      { type: 'FETCH_EMAILS' },
      {
        type: 'FETCHED_EMAILS',
        thisChunk: 1,
        totalChunks: 2,
        response: 'manual call 1'
      },
      {
        type: 'FETCHED_EMAILS',
        thisChunk: 2,
        totalChunks: 2,
        response: 'manual call 2'
      }
    ]

    await store.dispatch(fetchEmails())
    // Because the gapi-client is mocked it will not dispatch properly, thus we
    // need to manually call the execute to initiate the final dispatch within it.
    // We call it twice because we are expecting two batch executes due to our chunking
    mockExecute.mock.calls[0][0]('manual call 1')
    mockExecute.mock.calls[1][0]('manual call 2')

    assert.deepEqual(expected, store.getActions())

    // mockGet should have been called twice because emails where id !== threadId should have been filtered out
    assert.equal(mockGet.mock.calls.length, mockEmails.length - duplicateEmails.length)
  })
})
