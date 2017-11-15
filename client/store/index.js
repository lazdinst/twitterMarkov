import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { exportedState } from './reducers/app';
const preloadedState = window.__PRELOADED_STATE__ || {};
const initialState = preloadedState;

const enhancers = [];
const middleware = [thunk];

const devToolsExtension = window.devToolsExtension;
if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}

const composedEnhancers = compose( applyMiddleware(...middleware), ...enhancers);

const store = createStore( reducers, initialState, composedEnhancers);

export default store;