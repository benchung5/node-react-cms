import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// the browserHistory object specifies what part of the url react-router cares about
// this is different than the History module import that comes along with react-router when it's installed
// browserHistory cares about everything after the / in the url (posts/5):
// www.blog.com/posts/5
// we could use hashHistory for example would care about this:
// www.blog.com/#posts/5
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';


import App from './components/app';
import ProtecetWarning from './components/protected_warning';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Dashboard from './components/dashboard';
import ArticlesList from './components/articles/articles_list';


import RequireAuth from './components/require_auth';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

//on application load see if they have token in local storage
const token = localStorage.getItem('token');
//if have a token, consider the user to be signed in
if(token) {
  //we need to update applicatoin state so we use dispatch
  //to call our action like we do inside actions/index.js
  store.dispatch({ type: AUTH_USER });
}


//the Provider wraps the redux store and watches for when it changes
//then it will update any child compentents it contains.
//Our higher order component wraps the Administration component:
//{requireAuth(Administration)} here so it applies just to this instance. 
//The other way to do do it at the component level to apply to all instances.
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/admin-react" component={App}>
        <IndexRoute component={Signin} />
        <Route path="protected" component={ProtecetWarning} />
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />      
        <Route path="dashboard" component={RequireAuth(Dashboard)} />
        <Route path="articles-list" component={RequireAuth(ArticlesList)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));