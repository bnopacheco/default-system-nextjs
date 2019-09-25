import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { Map } from 'immutable';
import reducers from './reducers/reducers';

const initial = Map();

export const initialStore = (initialState = initial) => {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
};
