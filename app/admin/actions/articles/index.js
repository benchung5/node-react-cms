import axios from 'axios';
import {ROOT_URL} from '../../config';
import {
    FETCH_POSTS
    } from '../types';


export function fetchPosts() {

    return function(dispatch) {
        axios.get(`${ROOT_URL}/api/articles`)
        .then(response => {

            dispatch({
                type: FETCH_POSTS,
                payload: response.data
             });

        })
        .catch(() => {
            //if request is bad
            // dispatch(authError('error message'));
        });
    }
}