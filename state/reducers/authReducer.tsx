import * as im from 'immutable';
import UserBuilder from '../../models/builders/UserBuilder';
import {getCookie, removeCookie, setCookie} from '../../utils/cookie';
import { AUTHENTICATE, DEAUTHENTICATE, RESTORE_AUTH_STATE } from '../actionsConstants';

let prepareInitialState;
if (typeof localStorage !== 'undefined') {
   const authCookie = getCookie('auth');
   if (authCookie) {
        prepareInitialState = JSON.parse(decodeURIComponent(authCookie));
   } else {
        prepareInitialState = {
           isLoggedIn: false,
           user: {}
       };
   }
} else {
    prepareInitialState = {
       isLoggedIn: false,
       user: {}
   };
}

const initialState = im.Map(prepareInitialState);

const authReducer = (state = initialState, action) => {
   switch (action.type) {
       case DEAUTHENTICATE:
           removeCookie('auth');
           return state.merge({
               isLoggedIn: false
           });

       case AUTHENTICATE:
           const authObj = {
               isLoggedIn: true,
               user: action.payload
           };
           setCookie('auth', authObj);
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
