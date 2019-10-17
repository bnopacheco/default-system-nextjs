import UserBuilder from '../../models/builders/UserBuilder';
import { AUTHENTICATE, DEAUTHENTICATE, RESTORE_AUTH_STATE } from '../actionsConstants';

export const authenticateAction = (user) => {
    return {
        type: AUTHENTICATE,
        payload: user
    };
};

export const deAuthenticateAction = () => {
    return {
        type: DEAUTHENTICATE,
    };
};

export const restoreState = (authState) => {
    return {
        type: RESTORE_AUTH_STATE,
        payload: authState
    };
};

export const login = (loginDetails) => {
    return async (dispatch) => {
        try {
            dispatch(deAuthenticateAction());
            // login code. And storing data in result variable
            const result = UserBuilder.builder().setName('username').setEmail('username@email.com').build();
            dispatch(authenticateAction(result));

        } catch (e) {
            dispatch(deAuthenticateAction());
        }
    };
};

export const signUp = (signUpDetails) => {
    return async (dispatch) => {
        try {
            dispatch(deAuthenticateAction());
            // Signup code. And storing data in result variable
            const result = UserBuilder.builder().setName('username').setEmail('username@email.com').build();
            dispatch(authenticateAction(result));

        } catch (e) {
            dispatch(deAuthenticateAction());
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        dispatch(deAuthenticateAction());
    };
};

export const restore = (savedState) => {
    return (dispatch) => {
        dispatch(restoreState(savedState));
    };
};
