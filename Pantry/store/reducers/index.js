import { combineReducers } from 'redux'

import auth from './auth'
import ui from './ui'
import targets from './targets'

export default combineReducers({
  auth,
  ui,
  targets,
})
