import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/auth';
import {
    ROOT_URL
    } from '../config';

class Header extends Component {

    static contextTypes = {
      router: PropTypes.object
    };

    onSignOutClick() {

        this.props.signoutUser();
        this.context.router.push('/admin-react/signin');
        
    }
    
    renderLinks() {
        if (this.props.authenticated) {

            //show link to sign out
            return (
                <li className="nav-item" key={1}>
                    <a href="#" className="nav-link" onClick={this.onSignOutClick.bind(this)}>Sign Out</a>
                </li>
            );
        } else {
            // show link to sign in or sign up
            // we user this return[] semantic so we don't have to wrap the jsx in a div
            // since it's a static list we can just set the key to 1
            // return [
            //     <li className="nav-item" key={2}>
            //         <Link className="nav-link" to="/admin-react/signin">Sign In</Link>
            //     </li>,
            //     <li className="nav-item" key={3}>
            //         <Link className="nav-link" to="/admin-react/signup">Sign Up</Link>
            //     </li>
            // ]
        }
    }


    render() {
        return(
            <div>
                <nav className="navbar nabar-light">
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <a href={`${ROOT_URL}`} className="nav-link">Website</a>
                        </li>
                        {this.renderLinks() }
                    </ul>
                </nav>
                <div className="clear"></div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps, actions)(Header);