import  React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/auth';

class Signin extends Component {

    handleFormSubmit({ username, password }) {
        //console.log(username, password);
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
        );
    }

}

function mapStateToProps(state) {
    //have our state to show up in props as errorMessage
    return { errorMessage: state.auth.error }
}

export default reduxForm({
    form: 'signin',
    fields: ['username', 'password']
}, mapStateToProps, actions)(Signin);