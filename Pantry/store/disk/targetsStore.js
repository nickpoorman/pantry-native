import { AsyncStorage } from 'react-native'

const targetPrefix = 'target:'
const targetKey = key => `${targetPrefix}${key}`

export function get(key) {
  return AsyncStorage.getItem(targetKey(key))
}

export function set(key, target) {
  return AsyncStorage.setItem(targetKey(key), target)
}

export function del(key) {
  return AsyncStorage.removeItem(targetKey(key))
}

export function list() {
  // TODO: We might have to do some transform on this result
  return AsyncStorage.getAllKeys().then(keys =>
    AsyncStorage.multiGet(targetKeys(keys))
  )
}

function targetKeys(keys) {
  return keys.filter(key => isTargetKey(key))
}

function isTargetKey(key) {
  return key.startsWith(targetPrefix)
}
