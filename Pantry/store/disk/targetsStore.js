import { AsyncStorage } from 'react-native'
import sortBy from 'lodash.sortby'

const targetPrefix = 'target:'
const targetKey = key => `${targetPrefix}${key}`

export function get(key) {
  return AsyncStorage.getItem(targetKey(key)).then(value => JSON.parse(value))
}

export function set(key, target) {
  return AsyncStorage.setItem(targetKey(key), JSON.stringify(target))
}

export function del(key) {
  return AsyncStorage.removeItem(targetKey(key))
}

export function list() {
  return AsyncStorage.getAllKeys().then(keys =>
    AsyncStorage.multiGet(targetKeys(keys))
      .then(results => results.map(result => JSON.parse(result[1])))
      .then(storedTargets =>
        sortBy(storedTargets, ['position', 'createdAt', 'name'])
      )
  )
}

function targetKeys(keys) {
  return keys.filter(key => isTargetKey(key))
}

function isTargetKey(key) {
  return key.startsWith(targetPrefix)
}
