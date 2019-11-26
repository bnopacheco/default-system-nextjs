import { LOADING, LOADING_LOGIN } from '../actionsConstants';

export function loadingsAction(incrementLoading: number) {
    return { type: LOADING, incrementLoading };
}

export function loadingsLogin(loadingLogin: boolean) {
    return { type: LOADING_LOGIN, loadingLogin };
}
