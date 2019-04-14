import React, { Component } from 'react';
import './SignUp.scss';
import { withRouter, Link } from 'react-router-dom';
import RequestUser from '../../../utils/RequestUser';
import toastr from 'toastr';
import swal from 'sweetalert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            checkbox: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        // check in real time input field for any character!!!
        if(e.target.name === 'username') {
            let input = document.getElementById(`${e.target.name}`);
            
            !e.target.value.match('^[A-Za-z0-9-_]+$') ? 
                input.setAttribute('class', 'form-control is-invalid') 
                : input.setAttribute('class', 'form-control is-valid');
        }

        if(e.target.name === 'email') {
            let input = document.getElementById(`${e.target.name}`);
            
            !e.target.value.match('^[A-Za-z0-9._-]+@[a-z0-9.-]+.[a-z]{2,4}$') ? 
                input.setAttribute('class', 'form-control is-invalid') 
                : input.setAttribute('class', 'form-control is-valid');
        }

        if(e.target.name === 'firstName') {
            let input = document.getElementById(`${e.target.name}`);
            
            !e.target.value.match('^[A-Z][a-z- ]+$') ? 
                input.setAttribute('class', 'form-control is-invalid') 
                : input.setAttribute('class', 'form-control is-valid');
        }

        if(e.target.name === 'lastName') {
            let input = document.getElementById(`${e.target.name}`);
            
            !e.target.value.match('^[A-Z][a-z- ]+$') ? 
                input.setAttribute('class', 'form-control is-invalid') 
                : input.setAttribute('class', 'form-control is-valid');
        }

        if(e.target.name === 'password' || e.target.name === 'confirmPassword') {
            let input = document.getElementById(`${e.target.name}`);
            
            !e.target.value.match('^[A-Za-z0-9]+$') ? 
                input.setAttribute('class', 'form-control is-invalid') 
                : input.setAttribute('class', 'form-control is-valid');
        }

        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const { username, email, firstName, lastName, password, confirmPassword, checkbox } = this.state;
      
        /*
        / Username verification
        */
        if(username === '') {
            return toastr.warning('Username cannot be must empty!');
        }

        if(!username.match('^[A-Za-z0-9-_]+$')) {
            return toastr.warning('Username must be contains only letters and digit!');
        }

        /*
        / Email verification
        */
        if(email === '') {
            return toastr.warning('Email cannot be must empty!');
        }

        if(!email.match('^[A-Za-z0-9._-]+@[a-z0-9.-]+.[a-z]{2,4}$')) {
            return toastr.warning('Invalid Email!');
        }

        /*
        / FirstName verification
        */
        if(firstName === '') {
            return toastr.warning('FirstName cannot be must empty!');
        }

        if(!firstName.match('^[A-Z][a-z- ]+$')) {
            return toastr.warning('FirstName must be contains only letters!');
        }
        //Compare first letter is uppercase!
        if(firstName[0] !== firstName[0].toUpperCase()) {
            return toastr.warning('First letter must be Capital!');
        }

        /*
        / LastName verification
        */
        if(lastName === '') {
            return toastr.warning('LastName cannot be must empty!');
        }

        if(!lastName.match('^[A-Z][a-z- ]+$')) {
            return toastr.warning('LastName must be contains only letters!');
        }
        //Compare first letter is uppercase!
        if(lastName[0] !== lastName[0].toUpperCase()) {
            return toastr.warning('First letter must be Capital!');
        }

        /*
        / Password verification
        */
        if(password === '') {
            return toastr.warning('Password cannot be must empty!');
        }

        if(!password.match('^[A-Za-z0-9]+$')) {
            return toastr.warning('Password must be contains only letters and digit!');
        }

        if(password.length < 6) {
            return toastr.warning('Password must be least 6 characters long!');
        }
       
        // Match Password and ConfirmPassword
        if(password !== confirmPassword) {
            return console.log('Passwords must be mathes!');
        }

        if(!checkbox) {
            return console.log('Not accept own Condition!');
        }

        const successfull = await swal({
            title: 'Are you sure want to sign up?',
            text: 'You will registered permanently in the base!!!',
            icon: 'warning',
            dangerMode: true,
        });

        if (successfull) {
            try{
                const newUser = { username, email, firstName, lastName, password };
                const res = await RequestUser.register(newUser);

                if(res.error) {
                    return toastr.error(res.error);
                }

                toastr.success('You registered successful!');
                swal({
                    title: 'You registered successful!',
                    icon: 'success',
                    successMode: true
                });
                this.props.history.push('/signIn');
            }catch(error) { toastr.error(error.message); }
        }
    }

    render () {
        return (
            <div className="container-fluid" id="signUp">
                <section>
                    <div className="logoForm">
                        <span>
                            <FontAwesomeIcon icon="user-secret" color="#158CBA" pull="left" size="2x" fixedWidth className="logo-form"></FontAwesomeIcon>
                            <p>Privacy policy</p>
                        </span>
                    </div>
                    <div className="signUpForm">
                        <h2 className="h2">Sign Up Form</h2>
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="row">

                                <div className="form-group has-success">
                                    <label className="form-control-label" htmlFor="firstName">USERNAME</label>
                                    <span>
                                        <FontAwesomeIcon icon="user" color="#fff" size="2x"></FontAwesomeIcon>
                                        <input 
                                            type="text" 
                                            name="username"
                                            onChange={this.onChangeHandler} 
                                            placeholder="username"
                                            className="form-control is-valid" 
                                            id="username"/>
                                    </span> 
                                    <div className="valid-feedback">It's done.</div>
                                </div>

                                <div className="form-group has-danger">
                                    <label className="form-control-label" htmlFor="email">Email</label>
                                    <span>
                                        <FontAwesomeIcon icon="envelope" color="#fff" size="2x"></FontAwesomeIcon>
                                        <input 
                                            type="text" 
                                            name="email"
                                            onChange={this.onChangeHandler} 
                                            placeholder="email" 
                                            className="form-control is-valid" 
                                            id="email"
                                        />
                                    </span>
                                
                                    <div className="invalid-feedback">Sorry, that email taken. Try another?</div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="form-group has-success">
                                    <label className="form-control-label" htmlFor="firstName">FIRST NAME</label>
                                    <span>
                                        <FontAwesomeIcon icon="user" color="#fff" size="2x"></FontAwesomeIcon>
                                        <input 
                                            type="text" 
                                            name="firstName"
                                            onChange={this.onChangeHandler} 
                                            placeholder="firstName"
                                            className="form-control is-valid" 
                                            id="firstName" required/>
                                    </span> 
                                    <div className="valid-feedback">It's done.</div>
                                </div>

                                <div className="form-group has-success">
                                    <label className="form-control-label" htmlFor="lastName">LAST NAME</label>
                                    <span>
                                        <FontAwesomeIcon icon="user" color="#fff" size="2x"></FontAwesomeIcon>
                                        <input 
                                            type="text" 
                                            name="lastName"
                                            onChange={this.onChangeHandler} 
                                            placeholder="lastName"
                                            className="form-control is-valid" 
                                            id="lastName" required/>
                                    </span> 
                                    <div className="valid-feedback">It's done.</div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group has-success">
                                    <label className="form-control-label" htmlFor="password">Password</label>
                                    <span>
                                        <FontAwesomeIcon icon="lock" color="#fff" size="2x"></FontAwesomeIcon>
                                        <input 
                                            type="password" 
                                            name="password"
                                            onChange={this.onChangeHandler} 
                                            placeholder="******" 
                                            className="form-control is-valid" 
                                            id="password"
                                        />
                                    </span>
                                
                                    <div className="valid-feedback">It's done.</div>
                                </div>

                                <div className="form-group has-success">
                                    <label className="form-control-label" htmlFor="confirmPassword">Confirm Password</label>
                                    <span>
                                        <FontAwesomeIcon icon="lock" color="#fff" size="2x"></FontAwesomeIcon>
                                        <input 
                                            type="password" 
                                            name="confirmPassword"
                                            onChange={this.onChangeHandler} 
                                            placeholder="******" 
                                            className="form-control is-valid" 
                                            id="confirmPassword"
                                        />
                                    </span>
                                    <div className="valid-feedback">It's done.</div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input 
                                            type="checkbox" 
                                            name="checkbox"
                                            onChange={this.onChangeHandler} 
                                            className="custom-control-input" 
                                            id="customCheck2" 
                                            disabled=""/>
                                        <label className="custom-control-label" htmlFor="customCheck2">I accept Terms and Conditions</label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <button type="submit" id="signUp">Sign Up</button>
                            </div>

                            <div className="form-group join-account">
                                <Link to="/signIn">Join account?</Link>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(SignUp);