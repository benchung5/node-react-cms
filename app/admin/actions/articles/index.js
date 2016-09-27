import axios from 'axios';
import {ROOT_URL} from '../../config';
import {
    FETCH_ARTICLES,
    ADD_ARTICLE,
    ADD_ARTICLE_ERROR
    } from '../types';


export function fetchArticles() {

    return function(dispatch) {
        axios.get(`${ROOT_URL}/articles`)
        .then(response => {

            dispatch({
                type: FETCH_ARTICLES,
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
                console.log(response.data.error)
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

export function deleteArticle({ slug }) {
        return function(dispatch) {

        // post to http://192.168.99.100/articles/delete
        axios.post( `${ROOT_URL}/articles/delete`, { slug } )
        .then( response => {
            if(response.data.error) {
                //dispatch(deleteArticleError(`there was an error deleting the article: ${response.data.error}`));
            } else {
                dispatch(fetchArticles());
                // dispatch({
                //     type: DELETE_ARTICLE,
                //     payload: response.data
                // });
            }
        })
        .catch(() => {
            //todo: handle if request is bad
            console.log('error deleting the article');
        });
    }
}

export function addArticleError(error) {
    return {
        type: ADD_ARTICLE_ERROR,
        payload: error
    }
}