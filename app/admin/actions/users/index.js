import axios from 'axios';
import {ROOT_URL} from '../../config';
import {
    FETCH_USERS
    } from '../types';


export function fetchUsers() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/users`)
        .then(response => {

            dispatch({
                type: FETCH_USERS,
                payload: response.data
             });

        })
        .catch(() => {
            console.log('error fetching users');
            //todo: if request is bad
            // dispatch(authError('response.data.error'));
        });
    }
}

export function deleteUser({ username }) {
        return function(dispatch) {

        console.log('deleteUser called: ' )

        // post to http://192.168.99.100/articles/delete
        axios.post( `${ROOT_URL}/users/delete`, { username } )
        .then( response => {
            if(response.data.error) {
                //dispatch(deleteArticleError(`there was an error deleting the article: ${response.data.error}`));
            } else {
                dispatch(fetchUsers());
                // dispatch({
                //     type: DELETE_ARTICLE,
                //     payload: response.data
                // });
            }
        })
        .catch(() => {
            //todo: handle if request is bad
            console.log('error deleting the user');
        });
    }
}