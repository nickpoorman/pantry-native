import * as types from 'app/store/constants/action-types'

const initialState = {
  targetsLoading: false,
  targetsRefreshing: false,
  targetsLoaded: false,

  // This is something normalizr creates. Not sure what we should do with it...
  result: {
    targets: [], // these appear to be the IDs of the targets
  },
  entities: {
    targets: {},
  },

  currentTarget: null,
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
        targetsLoaded: true,
        [loadKey(action, 'targets')]: false,
      }

    case `${types.LOAD_TARGETS}_REJECTED`:
      return {
        ...state,
        [loadKey(action, 'targets')]: false,
      }

    // We don't need any of these yet
    // case `${types.CREATE_TARGET}_PENDING`:
    //   return {
    //     ...state,
    //   }

    // case `${types.CREATE_TARGET}_FULFILLED`:
    //   return {
    //     ...state,
    //   }

    // case `${types.CREATE_TARGET}_REJECTED`:
    //   return {
    //     ...state,
    //   }

    // case `${types.REMOVE_TARGET}_PENDING`:
    //   return {
    //     ...state,
    //   }

    // case `${types.REMOVE_TARGET}_FULFILLED`:
    //   return {
    //     ...state,
    //   }

    // case `${types.REMOVE_TARGET}_REJECTED`:
    //   return {
    //     ...state,
    //   }

    // No need to handle these right now
    // case `${types.SET_CURRENT_TARGET}_PENDING`:
    // case `${types.SET_CURRENT_TARGET}_REJECTED`:
    case `${types.SET_CURRENT_TARGET}_FULFILLED`:
      return {
        ...state,
        currentTarget: action.payload.currentTarget,
      }

    case 'SETUP_COMPLETE':
      return {
        ...state,
        ...action.targets,
      }

    default:
      return state
  }
}
