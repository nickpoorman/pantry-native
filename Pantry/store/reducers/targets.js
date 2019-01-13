import * as types from 'app/store/constants/action-types'

const initialState = {
  targetsLoading: false,
  targetsRefreshing: false,

  // This is something normalizr creates. Not sure what we should do with it...
  result: {
    targets: [], // these appear to be the IDs of the targets
  },
  entities: {
    targets: {},
  },
}

function loadKey(action, prefix) {
  return action.meta.refreshing ? `${prefix}Refreshing` : `${prefix}Loading`
}

export default function targets(state = initialState, action) {
  switch (action.type) {
    case `${types.LOAD_TARGETS}_PENDING`:
      return {
        ...state,
        [loadKey(action, 'targets')]: true,
      }

    case `${types.LOAD_TARGETS}_FULFILLED`:
      return {
        ...state,
        ...action.payload,
        [loadKey(action, 'targets')]: false,
      }

    case `${types.LOAD_TARGETS}_REJECTED`:
      return {
        ...state,
        [loadKey(action, 'targets')]: false,
      }

    case `${types.CREATE_TARGET}_PENDING`:
      return {
        ...state,
        [loadKey(action, 'targets')]: true,
      }

    case `${types.CREATE_TARGET}_FULFILLED`:
      return {
        ...state,
        // ...action.payload, // TODO: Add the target to targets...
        [loadKey(action, 'targets')]: false,
      }

    case `${types.CREATE_TARGET}_REJECTED`:
      return {
        ...state,
        [loadKey(action, 'targets')]: false,
      }

    default:
      return state
  }
}
