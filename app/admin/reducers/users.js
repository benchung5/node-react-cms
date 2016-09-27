import {
    FETCH_USERS
} from '../actions/types';

const INITIAL_STATE = { all:[], post:null };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case FETCH_USERS:
        //return a new object, take what's initially stored in state
        //then add on a new property all with action.payload as the value;
            return {...state, all: action.payload};

        default:
            return state;
    }
}