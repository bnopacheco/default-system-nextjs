import * as im from 'immutable';
import CompanyBuilder from '../../models/builders/CompanyBuilder';
import RoleBuilder from '../../models/builders/RoleBuilder';
import UserBuilder from '../../models/builders/UserBuilder';
import Role from '../../models/role';
import { ADMIN, USER, VENDOR } from '../../models/roles.types';
import User from '../../models/user.model';
import {getCookie, removeCookie, setCookie} from '../../utils/cookie';
import { AUTHENTICATE, DEAUTHENTICATE, RESTORE_AUTH_STATE } from '../actionsConstants';

const initialState = im.Map({user: new User()});

const authReducer = (state: any = initialState, action: any) => {
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
            return state;
   }
};

export default authReducer;
