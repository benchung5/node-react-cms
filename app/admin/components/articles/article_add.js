import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/articles';
import Sidebar from '../sidebar'

class AddArticle extends Component {

    // if form isn't valit redux form will not call this function
    handleFormSubmit(formProps) {
        // call action creator to sign up user
        this.props.addArticle(formProps);
    }

    renderAdded() {
        // console.log('articleAdded: ', this.props.articleAdded);
        if(this.props.articleAdded) {
            return (
                <div>
                    <span>Article: {this.props.articleAdded.title}<br/>successfully added. </span>
                </div>
            )
        }
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    
    render() {
        const { handleSubmit, fields: { title, slug, body }} = this.props;
        return (
            <div>
                <Sidebar/>
                <div className="col-md-10">
                    <h3>Add Article</h3>
                    <form  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}> 
                        <fieldset className="form-group">
                            <label>title:</label>
                            <input className="form-control" {...title} />
                            {title.touched && title.error && <div className="error">{title.error}</div>}
                        </fieldset>
                        <fieldset className="form-group">
                            <label>slug:</label>
                            <input className="form-control" {...slug} />
                            {slug.touched && slug.error && <div className="error">{slug.error}</div>}
                        </fieldset>
                        <fieldset className="form-group">
                            <label>body:</label>
                            <textarea className="form-control" rows="4" cols="50" {...body}></textarea>
                            {body.touched && body.error && <div className="error">{body.error}</div>}
                        </fieldset>
                        <button action="submit" className="btn btn-primary">Submit</button>
                    </form>
                    {this.renderAlert()}
                    {this.renderAdded()}
                </div>
            </div>
        );
    }
}

function validate(formProps) {
    const errors = {};

    //todo: use the map or foreach to shorten this code
    if (!formProps.title) {
        errors.title = 'Please enter a title';
    }

    if (!formProps.slug) {
        errors.slug = 'Please enter a slug';
    }

    if (!formProps.body) {
        errors.body = 'Please enter body';
    }

    // return empty object if no errors
    // this will get assigned to the error property of the field at hand
    // so we can display it with slug.error
    return errors;
}

function mapStateToProps(state) {
    //console.log('state: ', state.article.articleAdded);
    return { 
        articleAdded: state.article.articleAdded,
        errorMessage: state.article.addArticleError
    };
}

export default reduxForm({
    form: 'article-add',
    fields: ['title', 'slug', 'body'],
    // validate: validate
    validate
}, mapStateToProps, actions)(AddArticle);



