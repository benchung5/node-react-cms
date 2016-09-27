import {
    DELETE_USER
} from '../actions/types';

export default function(state = false, action) {
    switch (action.type) {

        case DELETE_USER:
            console.log('delete user reducer called');
            // console.log('payload: ', action.payload);
            return { ...state, userDeleted: action.payload };

    }
    
    return state;
}