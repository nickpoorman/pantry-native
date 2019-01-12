import { AsyncStorage, Platform } from 'react-native'
import { SecureStore } from 'expo'

const oldAndroid = Platform.OS === 'android' && Platform.Version <= 19

export function getItemAsync(item) {
  if (oldAndroid) {
    return AsyncStorage.getItem(item)
  }

  return SecureStore.getItemAsync(item)
}

export function setItemAsync(item, value) {
  if (oldAndroid) {
    return AsyncStorage.setItem(item, value)
  }

  return SecureStore.setItemAsync(item, value)
}

export function deleteItemAsync(item) {
  if (oldAndroid) {
    return AsyncStorage.removeItem(item)
  }

  return SecureStore.deleteItemAsync(item)
}
