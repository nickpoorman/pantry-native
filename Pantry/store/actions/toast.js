/* eslint import/prefer-default-export: 0 */

import * as types from 'app/store/constants/action-types'

export function showToast({ alert, success }) {
  return {
    type: types.SHOW_TOAST,
    alert,
    success,
  }
}

export function hideToast() {
  return {
    type: types.HIDE_TOAST,
  }
}
