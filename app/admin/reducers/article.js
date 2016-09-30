import {
    ADD_ARTICLE,
    DELETE_ARTICLE,
    ADD_ARTICLE_ERROR
} from '../actions/types';

export default function(state = false, action) {
    switch (action.type) {

        case ADD_ARTICLE:
            return { ...state, articleAdded: action.payload };
        case DELETE_ARTICLE:
            return { ...state, articleDeleted: action.payload };
        case ADD_ARTICLE_ERROR:
            return { state, addArticleError: action.payload };
            
    }
    
    return state;
}