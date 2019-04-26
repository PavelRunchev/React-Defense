import React from 'react';
import './Contacts.scss';

export default class Contacts extends React.Component {
    render () {
        return(
            <div className="container-fluid contacts-section">
                <div className="inner-contacts">
                    <p id="owner"><span>Owner: </span> Pavel Runchev</p>
                    <p id="owner-name"><span>Username: </span> RAIDERS</p>
                    <p id="owner-email"><span>Email: </span> Pavel.Runchev@gmail.com</p>
                    <p id="owner-phone"><span>Phone: </span>0879 999 436</p>
                    <p id="admin"><span>Admin: </span> Borislav Batkov</p>
                    <p id="admin-name"><span>Username: </span> abobo</p>
                    <p id="admin-email"><span>Email: </span> Setty_ii@abv.bg</p>
                    <p id="admin-phone"><span>Phone: </span>0879 774 903</p>
                    <p id="development-softuni"><span>Development University:</span> SoftUni</p>
                    <p id="softuni-logo" className="pl-4"><img src={require('../../../image/softuni-logo.png')} alt="logo"/></p>
                    <p id="developer"><span>Developer:</span> RAIDERS</p>
                    <p id="developer-logo" className="pl-4"><img src={require('../../../image/raiders-team.jpg')} alt="logo"/></p>
                </div>
            </div>
        );
    }
}