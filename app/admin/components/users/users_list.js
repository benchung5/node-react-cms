import React, {Component} from 'react';
import {connect} from 'react-redux';
import Sidebar from '../sidebar';
import * as actions from '../../actions/users';

class UsersIndex extends Component {

	componentWillMount() {
		this.props.fetchUsers();
	}

	onDeleteUserClick(event) {
		let username = event.target.getAttribute("data-username");
		this.props.deleteUser({ username })
	}

	renderUsers() {
		return this.props.users.map((user) => {
			return (
				<li className="list-group-item" key={user.username}>
					<span>{user.username}</span>
					<a href="#" data-username={user.username} onClick={this.onDeleteUserClick.bind(this)}>Delete</a>
				</li>
			)
		});
	}

	render() {
			return (
				<div>
					<Sidebar/>
					<div className="col-md-10">
						<h3>Users</h3>
						<ul className="list-group item-list">
							{this.renderUsers()}
						</ul>
					</div>
				</div>
			);
	}

}

function mapStateToProps(state) {
	return {
		users: state.users.all,
        //you may not need the below, but there for now
        userDeleted: state.user.userDeleted
	};
}

export default connect(mapStateToProps, actions)(UsersIndex);