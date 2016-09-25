import {
    ADD_ARTICLE,
    DELETE_ARTICLE,
    ADD_ARTICLE_ERROR
} from '../actions/types';

export default function(state = false, action) {
    switch (action.type) {

        case ADD_ARTICLE:
            // console.log('add-article');
            // console.log('payload: ', action.payload);
            return { ...state, articleAdded: action.payload };
        case DELETE_ARTICLE:
            console.log('delete article reducer called');
            // console.log('payload: ', action.payload);
            return { ...state, articleDeleted: action.payload };
        case ADD_ARTICLE_ERROR:
            // console.log('add-article');
            // console.log('payload: ', action.payload);
            return { state, addArticleError: action.payload };
            
    }
    
    return state;
}