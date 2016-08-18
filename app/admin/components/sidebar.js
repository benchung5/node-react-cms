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
                            <h5>Articles</h5>
                        </li>
                        <li>
                            <Link className="nav-link" to="/admin-react/articles-list">View</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/admin-react/article-add">Add</Link>
                        </li>
                    </ul>
                </div>
        );
}