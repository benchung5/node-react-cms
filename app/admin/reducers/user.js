import {
    DELETE_USER
} from '../actions/types';

export default function(state = false, action) {
    switch (action.type) {

        case DELETE_USER:
            return { ...state, userDeleted: action.payload };

    }
    
    return state;
}