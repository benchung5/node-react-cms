import axios from 'axios';
import {ROOT_URL} from '../../config';
import {
    FETCH_POSTS,
    ADD_ARTICLE,
    ADD_ARTICLE_ERROR
    } from '../types';


export function fetchPosts() {

    return function(dispatch) {
        axios.get(`${ROOT_URL}/articles`)
        .then(response => {

            dispatch({
                type: FETCH_POSTS,
                payload: response.data
             });

        })
        .catch(() => {
            console.log('error fetching articles');
            //todo: if request is bad
            // dispatch(authError('response.data.error'));
        });
    }
}


export function addArticle({ title, slug, body }) {
    return function(dispatch) {

        // post to http://192.168.99.100/api/articles/create
        axios.post( `${ROOT_URL}/articles/create`, { title, slug, body } )
        .then( response => {
            if(response.data.error) {
                dispatch(addArticleError(`there was an error creating the article: ${response.data.error}`));
            } else {
                dispatch({
                    type: ADD_ARTICLE,
                    payload: response.data
                });
            }
        })
        .catch(() => {
            //todo: if request is bad
            dispatch(addArticleError('there was an error creating the article'));
        });
    }
}

export function addArticleError(error) {
    return {
        type: ADD_ARTICLE_ERROR,
        payload: error
    }
}