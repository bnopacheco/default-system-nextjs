import * as im from 'immutable';
import RoleBuilder from '../../models/builders/RoleBuilder';
import UserBuilder from '../../models/builders/UserBuilder';
import Role from '../../models/role';
import { ADMIN, USER, VENDOR } from '../../models/roles.types';
import User from '../../models/user.model';
import {getCookie, removeCookie, setCookie} from '../../utils/cookie';
import { AUTHENTICATE, DEAUTHENTICATE, RESTORE_AUTH_STATE } from '../actionsConstants';

let initialState;
if (typeof localStorage !== 'undefined') {
    const userCookie = getCookie('user');
    if (userCookie) {
        const userDecodedCookie = JSON.parse(atob(decodeURIComponent(userCookie)));
        const roles: Role[] = [];
        userDecodedCookie.roles.forEach((role: string) => {
            switch (role) {
                case ADMIN:
                    roles.push(RoleBuilder.builder().setName(ADMIN).build());
                    break;
                case VENDOR:
                    roles.push(RoleBuilder.builder().setName(VENDOR).build());
                    break;
                default:
                    roles.push(RoleBuilder.builder().setName(USER).build());
                    break;
            }
        });

        const user: User = UserBuilder.builder()
            .setName(userDecodedCookie.name)
            .setEmail(userDecodedCookie.email)
            .setRoles(roles)
            .setToken(userDecodedCookie.token)
            .build();
        initialState = im.Map({user});
    } else {
        initialState = im.Map({user: new User()});
    }
} else {
   initialState = im.Map({user: new User()});
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
       case DEAUTHENTICATE:
           return state.merge({
               isLoggedIn: false
           });

       case AUTHENTICATE:
           const authObj = {
               isLoggedIn: true,
               user: action.payload
           };
           return state.merge(authObj);

       case RESTORE_AUTH_STATE:
           return state.merge({
               isLoggedIn: true,
               user: action.payload.user
           });

       default:
           return initialState;
   }
};

export default authReducer;
