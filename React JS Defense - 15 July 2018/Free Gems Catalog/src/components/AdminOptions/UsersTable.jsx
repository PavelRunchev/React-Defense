import React, { Component } from 'react';
import './UsersTable.scss';
import { withRouter } from 'react-router-dom';
import User from './Model/User';

class UsersTable extends Component {
   
    render() {
        const userList = this.props.data;
        let renderUser = [];
        if(userList.length) {
            renderUser = userList.map((u, i) => {
                u.index = i + 1;
                return <User key={u._id} props={u} handler={this.props.handler}/>;
            });
        }

        return (
            <table className="table table-hover table-responsive-l">
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
                <tfoot>

                </tfoot>
            </table>
        );
    }
}

export default withRouter(UsersTable);