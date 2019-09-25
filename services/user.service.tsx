import UserBuilder from '../models/builders/UserBuilder';
import { userAction } from '../state/actions/user.action';

export default class UserService {

    public static findUser(id: number) {
        return (dispatch: any) => {
            dispatch(userAction(UserBuilder.builder().setName('John').setEmail('john@mail.com').build()));
          };
    }
}
