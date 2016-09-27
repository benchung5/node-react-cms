import { combineReducers } from 'redux';
//lets change the variable name to form to avoid confusion
import { reducer as form } from 'redux-form';
import authenticationReducer from './authentication';
import articlesReducer from './articles';
import articleReducer from './article';
import usersReducer from './users';
import userReducer from './user';

const rootReducer = combineReducers({
  //form: form
  form,
  auth: authenticationReducer,
  articles: articlesReducer,
  article: articleReducer,
  users: usersReducer,
  user: userReducer

});

export default rootReducer;
