import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    people: [],
    person: {},
}

const personAction = (state = initialState, action) => {
    //console.log(action)
    switch (action.type) {
        case 'READ_ALL':
            /* return {personData:[...state, action.payload]} */
            return { ...state, people: action.payload }
        case 'READ_ONE':
            return { ...state, person: action.payload }
        default:
            return state
        /* case 'CREATE':
            return { personData: action.payload }
        case 'UPDATE':
            return { personData: action.payload }
        case 'DELETE':
            return { personData: action.payload } */

    }

}

const enhancer = applyMiddleware(thunk)

const store = createStore(personAction, enhancer)

export default store;
