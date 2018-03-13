// @flow

export const callbackURL = process.env.CALLBACK_URL || 'http://localhost:3000/'
export const googleClientId = process.env.GOOGLE_ID2 || 'DEV_GOOGLE_ID'
export const googleClientSecret = process.env.GOOGLE_SECRET2 || 'DEV_GOOGLE_SECRET'
export const googleDiscoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest']
export const googleScopes = 'https://www.googleapis.com/auth/gmail.readonly'
