import { AsyncStorage } from 'react-native'

const statePrefix = 'state:'
const stateKey = key => `${statePrefix}${key}`

export function get(key) {
  return AsyncStorage.getItem(stateKey(key)).then(value => JSON.parse(value))
}

export function set(key, state) {
  return AsyncStorage.setItem(stateKey(key), JSON.stringify(state))
}

const currentTargetKey = 'targets.currentTarget'

export function setCurrentTarget(id) {
  return set(currentTargetKey, id)
}

export function loadCurrentTarget() {
  return get(currentTargetKey)
}
