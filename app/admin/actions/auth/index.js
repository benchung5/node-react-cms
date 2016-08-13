import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
    } from '../types';
import {
    ROOT_URL
    } from '../../config';

//if we were to be calling an api server on a different domain, port or subdomain, we'e have to
//use the 'cors' module on the api server


export function signinUser({ username, password }) {
    // this time to use redux thunk we return a function instead of a usual object for an action.
    // redux thunk give sirect access to the dispatcher method and allows us to call it
    // manually with as many actions as we want. There is no syncronus action here,
    //it will be called only when we call dispatch.
    return function(dispatch) {
    //submit email/password to the server { email:email, password:password }
    axios.post( `${ROOT_URL}/users/verify`, { username, password } )
        .then( response => {
            //if request is good...
            //update state to indicate user is authenticated
            dispatch( { type: AUTH_USER } )
            //save the JWT token
            //test this out by typing 
            //localStorage.getItem('token') 
            //in the browser console
            localStorage.setItem('token', response.data.token);
            //redirect to the route '/administration'
            browserHistory.push('/admin-react/dashboard');
        })
        .catch(() => {
            //if request is bad
            dispatch(authError('Bad login info'));
        });
    }
}

export function signupUser({ username, password }) {
    return function(dispatch) {
        //todo: there is nearly identical logic within the signinUser action so
        //we can clean this up in the future
        axios.post( `${ROOT_URL}/users/create`, { username, password } )
        .then( response => {
            dispatch( { type: AUTH_USER } )
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/admin-react/dashboard');
        })
        .catch(() => {
            dispatch(authError('response.data.error'));
        });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER }
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/admin`, {
            headers: { authorization: localStorage.getItem('token') }
        })
        .then(response => { 
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data
            });
        });
    }
}