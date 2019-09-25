import * as im from 'immutable';
import UserBuilder from '../../models/builders/UserBuilder';
import { USER_ACTION } from '../actionsType';

const initialState = im.Map({ user: UserBuilder.builder().build() });

function userReducer(state = initialState, action: any) {

    switch (action.type) {
        case USER_ACTION:
            return state.merge({
                user: action.user
            });
        default:
            return state;
    }

}

export default userReducer;
