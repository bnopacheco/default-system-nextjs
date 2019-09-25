import User from '../../models/user.model';
import { USER_ACTION } from '../actionsType';

export function userAction(user: User) {
    return { type: USER_ACTION, user };
}
