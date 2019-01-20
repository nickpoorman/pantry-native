import { AsyncStorage } from 'react-native'
import Expo from 'expo'
// import Sentry from 'sentry-expo'

import * as TargetsStore from 'app/store/disk/targetsStore'
import * as StateStore from 'app/store/disk/stateStore'
import * as SecureStore from 'app/lib/secureStore'
import {
  showToast,
  loadTargetsFromStore,
  loadTargetData,
} from 'app/store/actions'
// import { graphql, axiosInstance, axios } from 'app/store/utils'
import { fetchTarget } from 'app/store/lib/target'

function _loadUser() {
  return SecureStore.getItemAsync('user').then(user => {
    // if (!user) {
    //   throw new Error('User not found in SecureStore')
    // }
    // TODO: Set this ^ back.
    // For now, we'll stub out user
    return { user: user || { id: 0 } }
  })
}

function _loadCurrentTarget(context) {
  return StateStore.loadCurrentTarget().then(id => ({
    ...context,
    currentTarget: id,
  }))
}

function _loadTargets(context) {
  return loadTargetsFromStore().then(targets => ({ ...context, targets }))
}

function _loadCurrentTargetData(context) {
  const { currentTarget, targets } = context
  if (
    !currentTarget ||
    !targets.entities ||
    !targets.entities.targets ||
    !targets.entities.targets[currentTarget]
  ) {
    // If we don't have a currentTarget, then there is nothing to load.
    return Promise.resolve(context)
  }

  const target = targets.entities.targets[currentTarget]
  return fetchTarget(target).then(data => ({
    ...context,
    currentTargetData: data,
  }))
}

export function load() {
  return dispatch =>
    _loadUser()
      // load the current target
      .then(_loadCurrentTarget)
      // Load the targets from the store
      .then(_loadTargets)
      // TODO: We'll probably want to fetch the current target data if some time has passed...
      .then(_loadCurrentTargetData)
      .then(context => {
        // TODO: Putting this here to test notifications, remove it..
        // dispatch(showToast({ alert: 'Email or password are incorrect.' }))

        const { user, targets, currentTarget, currentTargetData } = context

        // console.log(`context: ${JSON.stringify(context, null, 2)}`)
        dispatch({
          type: 'SETUP_COMPLETE',
          user,
          targets: {
            ...targets,
            currentTarget,
            targetsLoaded: true, // we've already loaded the targets at this point
            currentTargetData,
          },
        })

        return context
      })
      .catch(err => {
        if (err && err.message !== 'User not found in SecureStore') {
          console.error(err)
          // Sentry.captureException(err)
        }

        dispatch({
          type: 'BOOTING',
          booting: false,
        })
      })
}
