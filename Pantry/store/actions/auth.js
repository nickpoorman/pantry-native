import { AsyncStorage } from 'react-native'
import Expo from 'expo'
// import Sentry from 'sentry-expo'

import * as SecureStore from 'app/lib/secureStore'
import { showToast } from 'app/store/actions'
// import { graphql, axiosInstance, axios } from 'app/store/utils'

// Stub this for now
export function load() {
  return dispatch =>
    SecureStore.getItemAsync('user')
      .then(user => {
        // if (!user) {
        //   throw new Error('User not found in SecureStore')
        // }
        // TODO: Set this ^ back.
        // For now, we'll stub out user
        return user || { id: 0 }
      })
      .then(user => {
        dispatch(showToast({ alert: 'Email or password are incorrect.' }))
        dispatch({
          type: 'SETUP_COMPLETE',
          user: user,
        })
      })
}
