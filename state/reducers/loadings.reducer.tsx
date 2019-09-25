import { Map } from 'immutable';
import { LOADING } from '../actionsType';

const initialState = Map({ activeLoadings: 0 });

function loadingsReducer(state = initialState, action: any) {
    switch (action.type) {
        case LOADING:
            const activeLoadings = state.get('activeLoadings') + action.incrementLoading;
            return state.merge({ activeLoadings });
        default:
            return state;
    }
}

export default loadingsReducer;
