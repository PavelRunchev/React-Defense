import React, { Component } from 'react';
import './App.scss';
import { withRouter } from 'react-router-dom';
import AppRouter from './AppRouter';

//Common Components
import Navigation from './components/shared-components/Navigation/Navigation';
import Header from './components/shared-components/Header/Header';
import Footer from './components/shared-components/Footer/Footer';

//Import Font-Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faEnvelope, faLock, faUserSecret, faMapMarkerAlt, faPhone, faGlobeEurope , faClock, faCaretRight, faCloudSun, faSun, faCloudShowersHeavy, faCloudRain, faCloudMoon, faCloudSunRain, faPooStorm , faSmog, faMoon, faCloudMoonRain} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGithub, faLinkedin, faSkype, faGitlab, faReact, faHtml5, faSass, faBootstrap, faWindows, faAndroid, faChrome, faFirefox, faEdge} from '@fortawesome/free-brands-svg-icons';
import { faHandPointRight , faCaretDown, faTrashAlt, faEdit, faCloud} from '@fortawesome/fontawesome-free-solid';
import { } from '@fortawesome/free-regular-svg-icons';
import { } from '@fortawesome/fontawesome';

library.add( 
    faUser, faEnvelope, faLock, faUserSecret, 
    faMapMarkerAlt, faEnvelope, faPhone, faGlobeEurope, 
    faFacebookF, faTwitter, faGithub, 
    faLinkedin, faSkype, faGitlab, faClock, faGlobeEurope,
    faHandPointRight, faCaretDown, faCaretRight, faTrashAlt, faEdit,
    faCloudSun, faSun, faCloudShowersHeavy, faCloudRain, faCloud, 
    faCloudMoon, faCloudSunRain, faPooStorm, faSmog, faMoon,
    faReact, faHtml5, faSass, faBootstrap,
    faWindows, faAndroid, faChrome, faFirefox, faEdge,
    faCloudMoon, faCloudMoonRain
);

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navigation />
                <Header />
                <AppRouter />
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);
