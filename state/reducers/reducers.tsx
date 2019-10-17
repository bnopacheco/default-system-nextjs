import { combineReducers } from 'redux-immutable';
import authReducer from './authReducer';
import loadingsReducer from './loadings.reducer';
import messagesReducer from './messages.reducer';

const reducer = combineReducers({
  messagesReducer,
  loadingsReducer,
  authReducer
});

export default reducer;
