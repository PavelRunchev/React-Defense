import React, { Component } from 'react';
import './MyProfile.scss';
import { withRouter } from 'react-router-dom';
import RequestUser from '../../../utils/RequestUser';
import toastr from  'toastr';

class MyProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
        };

        this.onChangeProfile = this.onChangeProfile.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {  this.setState({ [e.target.name]: e.target.value }); }

    async onChangeProfile(e) {
        e.preventDefault();
        const { username, email, firstName, lastName, } = this.state;

        const changeUsername = username || this.props.data.username;
        const changeEmail = email || this.props.data.email;
        const changeFirstName = firstName || this.props.data.firstName;
        const changeLastName = lastName || this.props.data.lastName;

        /*
        / Username verification
        */
        if(changeUsername === '' || changeUsername === undefined || changeUsername === null) {
            return toastr.warning('Username cannot be must empty!');
        }

        if(!changeUsername.match('^[A-Za-z0-9-_]+$')) {
            return toastr.warning('Username must be contains only letters and digit!');
        }

        /*
        / Email verification
        */
        if(changeEmail === '' || changeEmail === undefined || changeEmail === null) {
            return toastr.warning('Email cannot be must empty!');
        }

        if(!changeEmail.match('^[A-Za-z0-9._-]+@[a-z0-9.-]+.[a-z]{2,4}$')) {
            return toastr.warning('Invalid Email!');
        }

        /*
        / FirstName verification
        */
        if(changeFirstName === '' || changeFirstName === undefined || changeFirstName === null) {
            return toastr.warning('FirstName cannot be must empty!');
        }

        if(!changeFirstName.match('^[A-Z][a-z- ]+$')) {
            return toastr.warning('FirstName must be contains only letters!');
        }
        //Compare first letter is uppercase!
        if(changeFirstName[0] !== changeFirstName[0].toUpperCase()) {
            return toastr.warning('First letter must be Capital!');
        }

        /*
        / LastName verification
        */
        if(changeLastName === '' || changeLastName === undefined || changeLastName === null) {
            return toastr.warning('LastName cannot be must empty!');
        }

        if(!changeLastName.match('^[A-Z][a-z- ]+$')) {
            return toastr.warning('LastName must be contains only letters!');
        }
        //Compare first letter is uppercase!
        if(changeLastName[0] !== changeLastName[0].toUpperCase()) {
            return toastr.warning('First letter must be Capital!');
        }

        const userId = localStorage.getItem('id');
        
        try{
            if(userId !== undefined) {
                const body = {
                    username: changeUsername,
                    email: changeEmail,
                    firstName: changeFirstName,
                    lastName: changeLastName
                };
                const res = await RequestUser.editUser(userId, body);
                if(res.error) {
                    return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
                }

                toastr.success('You changed profile successful!');
                localStorage.setItem('username', changeUsername);
                this.props.history.push('/signIn');
            }  
        }catch(error) { console.log(error.message); }
        
    }

    render () {
        const profile = this.props.data;

        return (
            <div id="accordion">
                <div className="card">
                    <div className="card-header" id="headingFour">
                        <button className="view-profile collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            View Profile
                        </button>
                    </div>
                    <div className="card-body collapse" id="collapseFour" aria-labelledby="headingFour" data-parent="#accordion">
                        <h4>User Profile</h4>
                        <form onSubmit={this.onChangeProfile}>
                            <div className="row">
                                <label>Username</label>
                                <input name="username" placeholder={profile.username} onChange={this.onChangeHandler}/>
                            </div>
                            <div className="row">
                                <label>Email</label>
                                <input name="email" placeholder={profile.email} onChange={this.onChangeHandler}/>
                            </div>
                            <div className="row">
                                <label>First Name</label>
                                <input name="firstName" placeholder={profile.firstName} onChange={this.onChangeHandler}/>
                            </div>
                            <div className="row">
                                <label>Last Name</label>
                                <input name="lastName" placeholder={profile.lastName} onChange={this.onChangeHandler}/>
                            </div>
                            <button className="save-change">Save Change</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MyProfile);