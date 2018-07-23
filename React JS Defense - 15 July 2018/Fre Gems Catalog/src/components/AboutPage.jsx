import React, { Component } from 'react';
import './About.css';

class AboutPage extends Component {
    render () {
        return (
            <div className="about">
                <h1>About Gems Catalog!</h1>
                <div className="fontAbout">
                    <strong>    This is a simple web site Gems Catalog, where you can collected gems in your store.</strong><br/>
                    <strong>If collected three gems from one types, will must upgraded in Jewel.</strong><br/>
                    <strong>If upgraded successful automatic sending in your store and public section from Jewels!</strong><br/> 
                    <strong>All authentication users will be able to give you a raiting on your jewel or write a post about it!</strong><br/>
                    <strong>Anyone who has written a post will be deleted him and if he is an administrator.</strong>
                    <strong>If you do not like  your gems or jewels you can destroy them.</strong>
                </div>
                
            </div>
        )
    }
}

export default AboutPage;