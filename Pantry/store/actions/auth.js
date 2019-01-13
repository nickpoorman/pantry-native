import { AsyncStorage } from 'react-native'
import Expo from 'expo'
// import Sentry from 'sentry-expo'

import * as SecureStore from 'app/lib/secureStore'
import { showToast, lo } from 'app/store/actions'
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
        // TODO: Putting this here to test notifications, remove it..
        // dispatch(showToast({ alert: 'Email or password are incorrect.' }))

        // TODO: We'll probably want to load the targets here...
        // dispatch(loadTargets)

        dispatch({
          type: 'SETUP_COMPLETE',
          user: user,
        })
      })
}
