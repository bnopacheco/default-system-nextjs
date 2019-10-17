import UserBuilder from '../models/builders/UserBuilder';
import { authenticateAction } from '../state/actions/authAction';

export default class UserService {

    public static login(email: string, password: string) {
        return (dispatch: any) => {
            dispatch(authenticateAction(UserBuilder.builder().setName('John').setEmail(email).build()));
        };
    }

    public static loadUser() {
        return (dispatch: any) => {
            dispatch(authenticateAction(UserBuilder.builder().setName('username').setEmail('user@email.com').build()));
        };
    }
}
