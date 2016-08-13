
// import {
//     CHANGE_AUTH
// } from '../actions/types';

import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from '../actions/types';

export default function(state = false, action) {
    switch (action.type) {
        // case CHANGE_AUTH:
        case AUTH_USER:
            //if user successfully logins/signs up, we should clear any errors: error:''
            return { ...state, error: '', authenticated: true };
        case UNAUTH_USER:
            return { ...state, authenticated: false };
        // return action.payload;
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case FETCH_MESSAGE:
            return { ...state, message: action.payload };
    }
    
    return state;
}