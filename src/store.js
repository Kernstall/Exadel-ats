import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const isProd = process.env.NODE_ENV === 'production';
const winDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = !isProd && winDevtools ? winDevtools : compose;

export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)),
);
// do not
// touch
