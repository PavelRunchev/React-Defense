import React, { Component } from 'react';
import './AdminOptions.scss';
import { withRouter } from 'react-router-dom';
import RequestUser from '../../utils/RequestUser';
import toastr from 'toastr';
import UsersTable from './UsersTable';
import Loading from '../Loading/Loading';
import swal from 'sweetalert';

class UserOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

        this.onDeleteUser = this.onDeleteUser.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    onRefresh(e) {
        e.preventDefault();
        this.getUsers();
    }

    async getUsers() {
        const users = await RequestUser.allUsers();
        if(users.error) {
            return toastr.error(users.error.description);
        }

        let us = [];
        for (const u of users) {
            if (u._kmd.status === undefined)
                us.push(u);   
        }

        this.setState({ users: us });
    }

    onDeleteUser(e, id) {
        e.preventDefault();
        
        swal({
            title: 'Are you sure want to delete current user?',
            text: 'It will be deleted permanently from base?',
            icon: 'warning',
            dangerMode: true,
            showCancelButton: true,
        })
            .then(willDelete => {
                if(id !== undefined) {
                    
                    if (willDelete) {
                        RequestUser.removeUser(id).then(() => {
                            let usersArr = this.state.users.filter(u => u._id !== id);
                            this.setState({ users: usersArr });
                            toastr.success('The User is deleted successful!');
                            swal({ title: 'The User is deleted successful!', icon: 'success' });
                            this.props.history.push('/admin/adminOptions');
                        }).catch(error => {
                            toastr.error(error.message);
                        });  
                    }                   
                }
            });
    }

    componentDidUpdate() { }

    render () {
        const { users } = this.state;
        return (
            <div className="container-fluid user-options">
                <h2>Admin Section</h2>
                {!users.length ? <Loading/> : <div className="inner-user-options">
                    <h3>All registered users</h3>
                    <button className="refresh" onClick={this.onRefresh}>Refresh</button>
                    <UsersTable 
                        data={users} 
                        props={this.props}
                        handler={this.onDeleteUser}
                    />
                </div>}
            </div>
        );      
    }
}

export default withRouter(UserOptions);