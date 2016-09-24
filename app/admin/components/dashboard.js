import React from 'react';
import Sidebar from './sidebar'

export default () => {

        return (
                <div>
                        <Sidebar/>
                        <div className="col-md-10">
                        <h3 className="margin-bottom">Dashboard</h3>
                        This is the protected access area to your site.
                        If you're seeing this, you must have logged in or created an account!
                        </div>
                </div>
        );
}




