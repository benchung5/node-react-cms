import { combineReducers } from 'redux';
//lets change the variable name to form to avoid confusion
import { reducer as form } from 'redux-form';
import authenticationReducer from './authentication';
import articlesReducer from './articles';
import articleReducer from './article';

const rootReducer = combineReducers({
  //form: form
  form,
  auth: authenticationReducer,
  articles: articlesReducer,
  article: articleReducer

});

export default rootReducer;
