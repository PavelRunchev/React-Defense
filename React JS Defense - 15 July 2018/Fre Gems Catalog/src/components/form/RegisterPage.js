import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './RegisterPage.css';
import toastr from 'toastr';
import ReqHandler from '../../utils/ReqHandler';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPass: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const usernamePattern = /^[A-Za-z]{3,}$/;
        const passwordPattern = /^[A-Za-z0-9]{6,}$/;

        let username = this.state.username;
        let password = this.state.password;
        let repeatPass = this.state.repeatPass;

        //validation
        if(!usernamePattern.test(username)) {
            toastr.warning("Username should be least 3 characters!");
            return;
        }

        if(!passwordPattern.test(password)) {
            toastr.warning('Password should be at least 6 characters!');
            return;
        }
        
        if(password !== repeatPass) {
            toastr.warning("Both passwords must match!");
            return;
        }

        let newUser = {
            username,
            password
        };

        ReqHandler.register(newUser).then(res => {
            toastr.success('Register Successful!');
            this.props.history.push('/login');
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="font">
                <div className="register">
                    <h2>Register:</h2>
                    <form className="formReg" onSubmit={this.onSubmitHandler}>
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
                        <label>RepeatPass:</label>
                        <input 
                            type="password" 
                            name="repeatPass" 
                            placeholder="Enter your repeatPass"
                            onChange={this.onChangeHandler}/>
                        <input type="submit" className="registerSubmit" value="Register"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterPage);