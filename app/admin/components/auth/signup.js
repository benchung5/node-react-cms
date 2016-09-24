import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/auth';
import {Link} from 'react-router';

// format: if valueistrue && valueistrue && valueistrue then return the last value
// if input has been clicked in then out (touched), and there's an error then return the div
class Signup extends Component {

    // if form isn't valit redux form will not call this function
    handleFormSubmit(formProps) {
        // call action creator to sign up user
        this.props.signupUser(formProps);
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
        const { handleSubmit, fields: { username, password, passwordConfirm }} = this.props;
        return (
            <div>
            <h3 className="margin-bottom">Sign Up</h3>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}> 
                <fieldset className="form-group">
                    <label>Username:</label>
                    <input className="form-control" {...username} />
                    {username.touched && username.error && <div className="error">{username.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input className="form-control" type="password" {...password} />
                    {password.touched && password.error && <div className="error">{password.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <input className="form-control" type="password" {...passwordConfirm} />
                    {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                </fieldset>
                <button action="submit" className="btn btn-primary">Sign up</button>
            </form>
            {this.renderAlert()}
            <p>Already have an account?</p>
            <Link className="nav-link" to="/admin-react/signin">Sign In</Link>
            </div>
        );
    }
}

function validate(formProps) {
    const errors = {};

    //todo: use the map or foreach to shorten this code
    if (!formProps.username) {
        errors.username = 'Please enter a username';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    // formProps update any time the form is clicked, typed into, etc.
    // console.log(formProps);
    if(formProps.password !== formProps.passwordConfirm) {
        errors.password = 'passwords must match';
    }

    // return empty object if no errors
    // this will get assigned to the error property of the field at hand
    // so we can display it with password.error
    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({ 
    form: 'signup',
    fields: ['username', 'password', 'passwordConfirm'],
    // validate: validate
    validate
}, mapStateToProps, actions)(Signup);