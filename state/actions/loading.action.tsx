import { LOADING } from '../actionsConstants';

export function loadingsAction(incrementLoading: number) {
    return { type: LOADING, incrementLoading };
}
