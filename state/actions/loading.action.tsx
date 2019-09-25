import { LOADING } from '../actionsType';

export function loadingsAction(incrementLoading: number) {
    return { type: LOADING, incrementLoading };
}
