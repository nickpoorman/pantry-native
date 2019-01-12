import * as types from 'app/store/constants/action-types'

const initialState = {
  spinner: false,
  connectionStatus: '',
  toast: {
    enabled: false,
    alert: null,
    success: null,
  },
}

export default function ui(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_SPINNER':
      return {
        ...state,
        spinner: true,
      }

    case 'HIDE_SPINNER':
      return {
        ...state,
        spinner: false,
      }

    case 'TOGGLE_SPINNER':
      return {
        ...state,
        spinner: !state.spinner,
      }

    case 'SET_CONNECTION_STATUS':
      return {
        ...state,
        connectionStatus: action.status,
      }

    case `${types.SAVE_TARGET}_REJECTED`:
    case `${types.SAVE_OTHER_THING}_REJECTED`:
      return {
        ...state,
        toast: {
          enabled: true,
          alert: action.payload.message,
        },
      }

    case types.SHOW_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          enabled: true,
          alert: action.alert,
          success: action.success,
        },
      }

    case types.HIDE_TOAST:
      return {
        ...state,
        toast: {
          ...initialState.toast,
        },
      }

    default:
      return state
  }
}
