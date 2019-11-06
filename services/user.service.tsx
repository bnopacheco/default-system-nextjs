import Router from 'next/router';
import RoleBuilder from '../models/builders/RoleBuilder';
import UserBuilder from '../models/builders/UserBuilder';
import { USER } from '../models/roles.types';
import User from '../models/user.model';
import { authenticateAction, deAuthenticateAction } from '../state/actions/authAction';
import { removeCookie, setCookie } from '../utils/cookie';

export default class UserService {

    public static login(email: string, password: string, rememberme: boolean, redirect: string) {
        return (dispatch: any) => {

            // fetch >> call api, get response, set user and toekn in storage cookies.
            const user: User = UserBuilder.builder()
                .setName('User Name')
                .setEmail(email)
                .setPassword(password)
                .setRole(USER)
                .setToken(btoa(password)).build();
            // fetch end

            setCookie('user', btoa(JSON.stringify(user)), rememberme);
            setCookie('token', user.token, rememberme);
            window.localStorage.removeItem('logout');
            dispatch(authenticateAction(user));

            if (redirect) {
                Router.push(redirect);
            }

            Router.push('/index');
        };
    }

    public static logout() {
        return (dispatch: any) => {
            removeCookie('user');
            removeCookie('token');

            if (window) {
                // to support logging out from all windows
                window.localStorage.setItem('logout', Date.now().toString());
            }

            dispatch(deAuthenticateAction());
            Router.push('/login');
        };
    }

    public static loadUser(user: User) {
        return (dispatch: any) => {
            dispatch(authenticateAction(user));
        };
    }
}
