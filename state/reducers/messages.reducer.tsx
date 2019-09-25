import { MESSAGES } from '../actionsType';
import * as im from 'immutable';

const initialState = im.fromJS({ messages: [] });

function messagesReducer(state = initialState, action: any) {
  switch (action.type) {
    case MESSAGES:
      return state.merge({ messages: action.messages });
    default:
      return state;
  }
}

export default messagesReducer;
