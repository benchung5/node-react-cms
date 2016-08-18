import React, {Component} from 'react';
import {connect} from 'react-redux';
import Sidebar from '../sidebar'
//no longer needed as the below uses the shorthand
//import {bindActionCreators} from 'redux';
//import {fetchPosts} from '../actions/index';
import * as actions from '../../actions/articles';
//Link is an actual react component provided by react router it will show up as an html anchor tag.
//The advantage is that ia really behaves like a real link with all it's perks
import {Link} from 'react-router';
import {
    ROOT_URL
    } from '../../config';

class ArticlesIndex extends Component {
    //this is a lifecyclemethod. If present, React will call this automatically whenever our compoenent is about to be rendered
    //to the dom for the first time. Here's where we should put our action creator in this case
    componentWillMount() {
        this.props.fetchPosts();
    }
    
    renderArticles() {

        //console.log(this.props.articles);
        return this.props.articles.map((article) => {
            return (
                <li className="list-group-item" key={article.slug}>
                    <span>{article.title}</span>
                    <a href={`${ROOT_URL}/${article.slug}`} target="new_window" >view</a>
                </li>
            );
        });
    }
    
    render() {
        return (
            <div>
                <Sidebar/>
                <div className="col-md-10">
                    <h3>Articles</h3>
                    <ul className="list-group article-list">
                        {this.renderArticles()}
                    </ul>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {articles:state.articles.all};
}

// the below is a shorthand way of doing this:
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({fetchPosts}, dispatch);
// }
// export default connect(null, mapDispatchToProps)(PostsIndex);
//
//export default connect(mapStateToProps, {fetchPosts: fetchPosts})(PostsIndex);
export default connect(mapStateToProps, actions)(ArticlesIndex);
//above is the sama as:
//{fetchPosts: fetchPosts}