import React, { Component } from 'react';
import './InfoUser.scss';
import { withRouter } from 'react-router-dom';
import RequestUser from '../../../utils/RequestUser';
import RequestPublicJewels from '../../../utils/RequestPublicJewels';
import RequestMyGems from '../../../utils/RequestMyGems';
import DateConvertor from '../../../utils/DateConvertor';
import toastr from 'toastr';
import Loading from '../../Loading/Loading';
import auth from '../../../utils/Auth';
import swal from 'sweetalert';

class InfoUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            userGems: [],
            userJewels: [],
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            lockUser: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDisabled = this.onDisabled.bind(this);
    }
            
    async componentDidMount() {
        const id = this.props.match.params.id;
        const user = await RequestUser.getUserById(id);
        if(user.error) {
            return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
        }
        const userJewels = await RequestPublicJewels.getJewelsForUser(user.username);
        if(userJewels.error) {
            return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
        }
        const userGems = await RequestMyGems.allMyGems(user.username);
        if(userGems.error) {
            return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
        }

        this.setState({ user, userJewels, userGems });   
    }

    onChangeHandler(e) { this.setState({ [e.target.name]: e.target.value }); }

    async onDisabled(e) {
        e.preventDefault();
        const userId = this.state.user._id;

        if(userId !== undefined) {
            const willDisabled = await swal({
                title: 'Are you sure want to desable current user?',
                text: 'It will be desabled to base?',
                icon: 'warning',
                dangerMode: true,
                showCancelButton: true,
            });

            if(willDisabled) {
                try{
                    const res = await RequestUser.disableUser(userId);
                    if(res.error) {
                        return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
                    }
        
                    swal({ title: 'The User is desabled successful!', icon: 'success' });
                    toastr.success('The current user is disabled!');
                    this.props.history.push('/admin/adminOptions');
                }catch(error) { console.log(error.message); }
            }
        }
    }

    async onSubmit(e) {
        e.preventDefault();
        const { username, email, firstName, lastName, user } = this.state;
        const userId = user._id;

        const modifyUser = {
            username: username || user.username || '',
            email: email || user.email || '',
            firstName: firstName || user.firstName || '',
            lastName: lastName || user.lastName || ''
        };

        const res = await RequestUser.editUser(userId, modifyUser);
        if(res.error) {
            return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
        }

        toastr.success('The user edited successful!');
        this.props.history.push('/admin/adminOptions');
    }

    render() {
        const { user, userGems, userJewels } = this.state;
       
        return (
            <div className="container-fluid edit-user">
                <h2>Info User Section</h2>
                {user === undefined ? <Loading/> : 
                    <div className="inner-info-user">
                        <div className="info">
                            <div className="main-info">
                                <p><span>Username: </span>{user.username}</p>
                                <p><span>Email: </span>{user.email}</p>
                                <p><span>First Name: </span>{user.firstName}</p>
                                <p><span>Last Name: </span>{user.lastName}</p>
                            </div>
                            <div className="advanced-info">
                                <p><span>Taked Gems: </span>{userGems.length}</p>
                                <p><span>created Jewels: </span>{userJewels.length}</p>
                                <p><span>Roles: </span>{user._kmd.roles === undefined ? 
                                    'User' : user._kmd.roles[0]['roleId'] === auth.adminId ? 'Admin' : 'Moderator'}
                                </p>
                                <p><span>Registered before: </span>{DateConvertor(user._kmd.lmt)}</p>
                            </div>

                            <button onClick={this.onDisabled}>Disable User</button>
                        </div>

                        <div id="accordion">
                            <div className="card">
                                <div className="card-header" id="headingFour">
                                    <button className="view-profile collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                Edit User
                                    </button>
                                </div>
                                <div className="card-body collapse" id="collapseFour" aria-labelledby="headingFour" data-parent="#accordion">
                                    <h4>User Profile</h4>
                                    <form onSubmit={this.onSubmit}>
                                        <div className="row">
                                            <label>Username</label>
                                            <input name="username" placeholder={user.username} onChange={this.onChangeHandler}/>
                                        </div>
                                        <div className="row">
                                            <label>Email</label>
                                            <input name="email" placeholder={user.email} onChange={this.onChangeHandler}/>
                                        </div>
                                        <div className="row">
                                            <label>First Name</label>
                                            <input name="firstName" placeholder={user.firstName} onChange={this.onChangeHandler}/>
                                        </div>
                                        <div className="row">
                                            <label>Last Name</label>
                                            <input name="lastName" placeholder={user.lastName} onChange={this.onChangeHandler}/>
                                        </div>
                                        <button className="save-change" type="submit">Save Change</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default withRouter(InfoUser);