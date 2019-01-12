const initialState = {
  booting: true,
  user: null,
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'BOOTING':
      return {
        ...state,
        booting: action.booting,
      }

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      }

    case 'SETUP_COMPLETE':
      return {
        ...state,
        user: action.user,
        booting: false,
      }

    case 'LOGOUT':
      return {
        ...state,
        booting: false,
        user: null,
      }

    default:
      return state
  }
}
