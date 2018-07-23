import React, { Component } from 'react';
import './About.css';

class ContactUsPage extends Component {
    render () {
        return (
            <div className="about">
                <h1>Contact us!</h1>
                <strong>Owner: </strong><p> RAIDERS</p>
                <strong>Email: </strong><p>Setty_ii@abv.bg</p>
                <p>Facebook: Pavel Runchev</p>
                <p>GSM: 0879999436</p>
                <br/>
                <strong>Admin: </strong><p>abobo</p>
                <strong>Email: </strong><p>abobo@yahoo.com</p>
                <p>Facebook: abobo</p>
                <p>GSM: 0879774903</p>
                <br/>
                <strong>Company: </strong>
                <p>SoftUni</p>
                <p>Software University System</p>
                <img src='http://live.varna.bg/media/images/86/1d/softuni-logo.png' alt='logo' width='200' height='200'/>
                <br/>
                <strong>Team: </strong><p>RAIDERS TEAM - Gabrovo</p>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRktDlqjMPtWFm40n3QsMMEm82eg_JpoQRAPkXsg72Tx3jakTIl8Q' alt="logo" width='200' height='200'/>
            </div>
            
        )
    }
}

export default ContactUsPage;