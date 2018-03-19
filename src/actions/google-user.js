// @flow
/* globals Dispatch */
import gapi from 'gapi-client'

import type { AnyAction } from '../types'

export const fetchGoogleUser = () => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: 'FETCH_GOOGLE_USER' })
  const googleAuth = await gapi.auth2.getAuthInstance()
  const googleUser = await googleAuth.currentUser.get()
  const userProfile = await googleUser.getBasicProfile()
  const [
    avatarUrl,
    email,
    firstName,
    lastName,
    name
  ] = await Promise.all([
    userProfile.getImageUrl(),
    userProfile.getEmail(),
    userProfile.getGivenName(),
    userProfile.getFamilyName(),
    userProfile.getName()
  ])

  dispatch({
    type: 'RECEIVED_GOOGLE_USER',
    avatarUrl,
    email,
    firstName,
    lastName,
    name
  })
}
