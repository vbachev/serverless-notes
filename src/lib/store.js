import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'
import createHistory from 'history/createBrowserHistory'

const homepage = 'https://vbachev.github.io/serverless-notes'
export const history = createHistory({
  basename: window.location.href.includes(homepage) ? 'serverless-notes' : ''
})

const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(rootReducer, composedEnhancers)

export default store