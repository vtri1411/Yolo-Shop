import { createStore, compose, applyMiddleware } from 'redux'
import reducer from './rootReducer'

const middleware = []

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		  })
		: compose
const enhancer = composeEnhancers(applyMiddleware(...middleware))

const store = createStore(reducer, enhancer)

export default store
