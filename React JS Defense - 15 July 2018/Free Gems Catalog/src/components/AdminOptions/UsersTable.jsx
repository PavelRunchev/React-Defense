import React, { Component, Fragment } from 'react';
import './UsersTable.scss';
import { withRouter } from 'react-router-dom';
import User from './Model/User';

class UsersTable extends Component {
   
    render() {
        const userList = this.props.data.sort((a,b) => a.username.localeCompare(b.username));
        let renderUser = [];
        if(userList.length) {
            renderUser = userList.map((u, i) => {
                u.index = i + 1;
                return <User key={u._id} props={u} handler={this.props.handler}/>;
            });
        }

        return (
            <Fragment>
                <table className="table table-hover table-responsive-s">
                    <thead className="table-dark">
                        <tr>
                            <th>N</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Created</th>
                            <th>Role</th>                       
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderUser}
                    </tbody>
                </table>
                <div className="total-users">
                    <p>Total Users: {renderUser.length}</p>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(UsersTable);