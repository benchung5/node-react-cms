import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';

import Articles from './articles/articles_index';

class Feature extends Component {

    componentWillMount() {
        this.props.fetchMessage();
    }

    render() {
        return (
            <div>
                <p>{this.props.message}</p>
                <Articles />
            </div>
            
        );
    }
}

function mapStateToProps(state) {
    return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);