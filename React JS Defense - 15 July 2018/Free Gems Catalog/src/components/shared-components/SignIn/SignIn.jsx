import React, { Component } from 'react';
import './SignIn.scss';
import { Link, withRouter } from 'react-router-dom';
import RequestUser from '../.././../utils/RequestUser';
import toastr from 'toastr';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username:  '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeHandler(e) {
        // check in real time input field in any character!!!
        if(e.target.name === 'username') {
            let input = document.getElementById(`${e.target.name}`);
            
            !e.target.value.match('^[A-Za-z0-9_-]+$') ? 
                input.setAttribute('class', 'form-control is-invalid') 
                : input.setAttribute('class', 'form-control');
        }

        if(e.target.name === 'password') {
            let input = document.getElementById(`${e.target.name}`);
            
            !e.target.value.match('^[A-Za-z0-9]+$') ? 
                input.setAttribute('class', 'form-control is-invalid') 
                : input.setAttribute('class', 'form-control');
        }

        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;

        if(username === '' || password === '') {
            return console.log('Fields cannot be must empty!');
        }

        try{
            const res = await RequestUser.login({ username, password });
            if(res.error) {
                return toastr.error('Invalid Username or Password!');
            }

            toastr.success('You Logged Successful!');
            localStorage.setItem('authtoken', res._kmd.authtoken);
            localStorage.setItem('id', res._id);
            localStorage.setItem('username', res.username);
            if(res._kmd.roles !== undefined) {
                localStorage.setItem('isAdmin', res._kmd.roles[0].roleId);
            }

            this.props.history.push('/home');
        } catch (error) {
            console.log(error.message);
        }
    }

    render () {
        return (
            <div className="container-fluid" id="signIn">
                <section>
                    <div className="signInForm">
                        <h2 className="h2">Sign In Form</h2>
                        <form onSubmit={this.onSubmit}>
                  
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="username">Username</label>
                                <span> 
                                    <input 
                                        type="text" 
                                        name="username"
                                        onChange={this.onChangeHandler} 
                                        placeholder="username" 
                                        className="form-control" 
                                        id="username"
                                    />
                                    <FontAwesomeIcon icon="envelope" color="#fff" size="2x" className="email-login"></FontAwesomeIcon>
                                </span>
                                
                                <div className="invalid-feedback">Sorry, that email taken. Try another?</div>
                            </div>

                            <div className="form-group has-success">
                                <label className="form-control-label" htmlFor="password">Password</label>
                                <span>
                                    <input 
                                        type="password" 
                                        name="password"
                                        onChange={this.onChangeHandler} 
                                        placeholder="******" 
                                        className="form-control" 
                                        id="password"
                                    />
                                    <FontAwesomeIcon icon="lock" color="#fff" size="2x" className="pass"></FontAwesomeIcon>
                                </span>
                                
                                <div className="valid-feedback">It's done.</div>
                            </div>

                            <div className="form-group">
                                <input type="submit" onChange={()=> {}} value="Sign In" id="signIn"/>
                            </div>
                            <div className="form-group no-account">
                                <Link to="/signUp">Don't have an account?</Link>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(SignIn);