import { Message } from '../../components/message/model/Message';
import { MESSAGES } from '../actionsConstants';

export function messagesAction(messages: Message[]) {
  return (dispatch: any) => {
    dispatch({ type: MESSAGES, messages });
  };
}

