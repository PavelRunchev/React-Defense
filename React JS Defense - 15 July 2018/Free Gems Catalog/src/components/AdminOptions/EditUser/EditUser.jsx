import React, { Component } from 'react';
import './EditUser.scss';
import { withRouter } from 'react-router-dom';
import RequestUser from '../../../utils/RequestUser';
import toastr from 'toastr';
import Loading from '../../Loading/Loading';

class EditUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            username: '',
            email: '',
            firstName: '',
            lastName: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onLocked = this.onLocked.bind(this);
    }
            
    async componentDidMount() {
        const id = this.props.match.params.id;
        const res = await RequestUser.getUserById(id);

        if(res.error) {
            return toastr.error(res.error);
        }

        this.setState({ user: res });   
    }

    onChangeHandler(e) { this.setState({ [e.target.name]: e.target.value }); }

    async onLocked(e) {
        e.preventDefault();

        const res = await RequestUser.lockdownUser({ userId: this.state.user._id, setLockdownStateTo: true });
        if(res.error) {

        }

        console.log(res);
    }

    onSubmit(e) {
        e.preventDefault();
        const { username, email, firstName, lastName, user } = this.state;
        const userId = user._id;

        const modifyUser = {
            username: username || user.username || '',
            email: email || user.email || '',
            firstName: firstName || user.firstName || '',
            lastName: lastName || user.lastName || ''
        };

        console.log(modifyUser);
        RequestUser.editUser(userId, modifyUser).then((res) => {
            if(res.error) {
                return toastr.error(res.error);
            }

            toastr.success('The user edited successful!');
            this.props.history.push('/admin/adminOptions');
        });
    }

    render() {
        const { user } = this.state;
       
        return (
            <div className="container-fluid edit-user">
                <h2>Edit User Section</h2>
                {user === undefined ? <Loading/> : <div className="inner-edit-user">
                    <form onSubmit={this.onSubmit}>
                        <span>
                            <label>Username</label>
                            <input type="text" name="username" 
                                placeholder={user.username} onChange={this.onChangeHandler}
                                
                            />
                        </span>
                        <span>
                            <label>Email</label>
                            <input type="text" name="email" 
                                placeholder={user.email} onChange={this.onChangeHandler}
                               
                            />
                        </span>
                        <span>
                            <label>FirstName</label>
                            <input type="text" name="firstName" placeholder={user.firstName} onChange={this.onChangeHandler}/>
                        </span>
                        <span>
                            <label>LastName</label>
                            <input type="text" name="lastName" placeholder={user.lastName} onChange={this.onChangeHandler}/>
                        </span>
                        <span>
                            <button className="edit-user">Edit</button>
                        </span>                       
                    </form>
                   
                </div>}
            </div>
        );
    }
}

export default withRouter(EditUser);