/* eslint import/prefer-default-export: 0 */

import * as types from 'app/store/constants/action-types'

export function toggleSpinner() {
  return {
    type: types.TOGGLE_SPINNER,
  }
}
