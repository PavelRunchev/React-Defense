import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './LoginPage.css';
import toastr from 'toastr';
import ReqHandler from '../../utils/ReqHandler';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;

        if(username === '' || password === '') {
            toastr.warning("Fields not be empty!");
            return;
        }

        let newUser = {
            username,
            password
        };

        let res = await ReqHandler.login(newUser);
        localStorage.setItem('authtoken', res._kmd.authtoken);
        localStorage.setItem('id', res._id);
        localStorage.setItem('username', res.username);
        if(res._kmd.roles !== undefined) {
            localStorage.setItem('isAdmin', res._kmd.roles[0].roleId);
        }
        toastr.success('Logged Successful');
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="font">
                <div className="login">
                    <h2>Login:</h2>
                    <form className="formLog" onSubmit={this.onSubmitHandler}>
                        <label>Username:</label>
                        <input 
                            type="username" 
                            name="username" 
                            placeholder="Enter your username" 
                            onChange={this.onChangeHandler}/>
                        <label>Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Enter your Password"
                            onChange={this.onChangeHandler}/>
                        <input type="submit" className="loginSubmit" value="Login"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginPage);