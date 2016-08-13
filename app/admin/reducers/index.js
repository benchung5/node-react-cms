import { combineReducers } from 'redux';
//lets change the variable name to form to avoid confusion
import { reducer as form } from 'redux-form';
import authenticationReducer from './authentication';
import articlesReducer from './articles';

const rootReducer = combineReducers({
  //form: form
  form,
  auth: authenticationReducer,
  articles: articlesReducer
});

export default rootReducer;
