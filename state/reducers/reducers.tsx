import { combineReducers } from 'redux-immutable';
import userReducer from './user.reducer';
import messagesReducer from './messages.reducer';
import loadingsReducer from './loadings.reducer';

const reducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,
  loadings: loadingsReducer,
});

export default reducer;
