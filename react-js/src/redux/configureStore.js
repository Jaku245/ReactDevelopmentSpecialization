import { createStore } from 'redux';
import { initialState, reducer } from './reducer';

export const configureStore = () => {
    const store = createStore(reducer, initialState );
    return store;
}