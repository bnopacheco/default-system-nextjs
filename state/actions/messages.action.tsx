import { MESSAGES } from '../actionsType';
import { Message } from '../../components/alert/model/Message';

export function messagesAction(messages: Message[]) {
  return (dispatch: any) => {
    dispatch({ type: MESSAGES, messages });
  };
}

