import User from '../../models/user.model';
import { AUTHENTICATE, DEAUTHENTICATE, RESTORE_AUTH_STATE } from '../actionsConstants';

export const authenticateAction = (user: User | null) => {
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

