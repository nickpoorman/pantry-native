import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import rootReducer from 'app/store/reducers'

export default function configureStore() {
  const middleware = [thunk, promise()]

  if (__DEV__) {
    const freeze = require('redux-freeze')
    middleware.push(freeze)
  }

  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('app/store/reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
