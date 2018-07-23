import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        const isAdmin = localStorage.getItem('isAdmin') !== null;
        return (
            <header>
                <div className="header">             
                    <ul>
                        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                        <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
                        <li><NavLink to="/contactUs" activeClassName="active">Contact Us</NavLink></li>
                        {loggedIn && <li><NavLink to="/listGems" activeClassName="active">List Gems</NavLink></li>}
                        {loggedIn && <li><NavLink to="/myStore" activeClassName="active">My Store</NavLink></li>}
                        {loggedIn && <li><NavLink to="/upgradedJewels" activeClassName="active">Upgraded Jewels</NavLink></li>}
                        {isAdmin && <li><NavLink to="/createGems" activeClassName="active">Create Gem</NavLink></li>}
                        {isAdmin && <li><NavLink to="/createJewel" activeClassName="active">Create Jewel </NavLink></li>}                                                            
                        {!loggedIn && <li><NavLink to="/login" activeClassName="active">Login </NavLink></li>}
                        {!loggedIn && <li><NavLink to="/register" activeClassName="active">Register </NavLink></li>}
                        {isAdmin && <div className="admin">
                            <li><i>Welcome Admin!</i></li>
                        </div>}
                        {loggedIn && <div className="topnav-right">
                            <li><NavLink activeClassName="active" to="/myStore">Hello, {localStorage.getItem('username')}!</NavLink></li>
                            <li><a href="javascript:void(0)" onClick={onLogout}>Logout</a></li>
                            </div>}                          
                    </ul>
                </div>
            </header>
        );
    }
}