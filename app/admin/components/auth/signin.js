import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/auth';
import {Link} from 'react-router';

class Signin extends Component {

    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
        if (this.props.authenticated) {
            // if the user is already logged in, just forward them right to the dashboard
            this.context.router.push('/admin-react/dashboard');
        }

    }

    handleFormSubmit({ username, password }) {
        //need to do sometihing to log user in
        this.props.signinUser({ username, password });
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

        //props that are pulled off of redux form
        const { handleSubmit, fields: {username, password} } = this.props;

        return (
            <div>
            <h3 className="margin-bottom">Login</h3>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>User Name:</label>
                    <input {...username} className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input {...password} type="password" className="form-control" />
                </fieldset>
                { this.renderAlert() }
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
            <p>Don't have an account?</p>
            <Link className="nav-link" to="/admin-react/signup">Sign Up</Link>
            </div>
        );
    }

}

function mapStateToProps(state) {
    //have our state to show up in props as errorMessage
    return {
        authenticated: state.auth.authenticated,
        errorMessage: state.auth.error
    }
}

export default reduxForm({
    form: 'signin',
    fields: ['username', 'password']
}, mapStateToProps, actions)(Signin);