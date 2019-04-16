import React, { Component } from 'react';
import './Navigation.scss';
import { NavLink, Link, withRouter } from 'react-router-dom';
import Dropdown from './Dropdown';
import toastr from 'toastr';
import auth from '../../../utils/Auth';
import RequestUser from '../../../utils/RequestUser';
let Img = require('react-image');

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }
        
    onLogout(e) {
        e.preventDefault();

        RequestUser.logout().then(res => {
            if(res.error) {
                return toastr.error('No Authentication! Try again sign in!');
            }
            localStorage.clear();
            toastr.success('Logout successful');
            this.props.history.push('/home');
        });     
    }

    render () {
        const username = localStorage.getItem('username');
        const isAdmin = auth.isAdmin();
        const isLogged = auth.isLogged();
      
        return (
            <nav className="navbar navbar-expand-lg navbar-dark">
                <Img src={ require('../../../image/gems.jpg')} className="logo-navigation" alt="logo"/>
                <NavLink className="navbar-brand" to="/">GEMS CATALOG</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav">
                        {isLogged && <Dropdown isAdmin={isAdmin} loggedUser={isLogged}/>}

                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/">Home</NavLink>
                        </li>
                        {!isLogged && <li className="nav-item">
                            <NavLink className="nav-link" to="/signIn">Sign In</NavLink>
                        </li>}
                        {!isLogged && <li className="nav-item">
                            <NavLink className="nav-link" to="/signUp">Sign Up</NavLink>
                        </li>}
                    </ul>

                    {isAdmin && isLogged && <div className="seen-only-by-admin">
                        <h4>You have administrative rights!</h4>
                    </div>}
                </div>
               
                <div className="logged-user-show">
                    {isLogged && <p className="username">Hello, <span>{username}</span></p>}
                    {isLogged && <Link to="/" className="nav-link" onClick={this.onLogout}>Logout</Link>}
                </div>
            </nav>
        );
    }
}

export default withRouter(Navigation);