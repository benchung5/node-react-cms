import React from 'react';
import {Link} from 'react-router';

export default () => {

        return (
                <div className="col-md-2">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link className="nav-link" to="/admin-react/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/admin-react/articles-list">View Articles</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/admin-react/article-add">Add Articles</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/admin-react/users-list">View Users</Link>
                        </li>
                    </ul>
                </div>
        );
}