import React, {Component} from  'react';
import './Dropdown.scss';
import { NavLink, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Dropdown extends Component {
    render () {
        const isAdmin = this.props['isAdmin'];
        const loggedUser = this.props['loggedUser'];
        return (
            <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="#">Dropdown</NavLink>
                <ul className="inner-dropdown">
                    <li className="menu-gems">
                        {loggedUser && <NavLink to="#">Gems <FontAwesomeIcon icon="caret-right" className="hand-right"></FontAwesomeIcon>
                        </NavLink>}

                        <ul className="nested-navlink-gems">
                            <li>
                                {loggedUser && <NavLink to="/gems/allGems">Gems List</NavLink>}
                                {isAdmin && loggedUser && <NavLink to="/gems/createGem">Create Gem</NavLink>}
                            </li>
                        </ul>
                    </li>
                    <li className="menu-jewels">
                        {loggedUser && <NavLink to="#">Jewels <FontAwesomeIcon icon="caret-right" className="hand-right"></FontAwesomeIcon>
                        </NavLink>}
                        <ul className="nested-navlink-jewels">
                            <li>
                                {loggedUser && <NavLink to="/publicJewels/allPublicJewels">Public Jewels</NavLink>}
                                {isAdmin && loggedUser && <NavLink to="/createJewel">Create Jewel</NavLink>}
                                {isAdmin && loggedUser && <NavLink to="/allJewels/listFromJewels">All Jewels</NavLink>}
                            </li>                        
                        </ul>
                    </li>
                    <li>
                        {loggedUser && <NavLink to="/myRoom/privateRoomSection">My Room</NavLink>}
                    </li>
                    <li>
                        {isAdmin && loggedUser && <NavLink to="/admin/adminOptions">Admin Options</NavLink>}
                    </li>                    
                </ul>
            </li>
        );
    }
}

export default withRouter(Dropdown);