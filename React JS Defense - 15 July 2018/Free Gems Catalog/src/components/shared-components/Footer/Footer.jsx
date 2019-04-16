import React, { Component } from 'react';
import './Footer.scss';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let weather = require('openweather-apis');
//let data = '';
// English - en
weather.setLang('en');
//API key from your accaunt from www.openweathermap.org
weather.setAPPID('b1f37242db0552272e785fbb3ac2d463');
weather.setCity('Sofia');

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            temp: 0,
            main: ''
        };
    }

    componentDidMount() {
        setInterval(() => this.setState({ date: new Date() }), 1000);
        this.weather();
        this.weatherTemp();
    }

    async weatherTemp() {
        setInterval(() => {
            this.weather();
        }, 1800000);
    }

    weather() {
        weather.getAllWeather((err, JSONObj) => {
            //const JSONObj = { id: 1, main: { temp: 26 }, weather: [{main: 'Rain'}]};
            const obj = JSON.parse(JSON.stringify(JSONObj));

            if(obj !== null && obj !== undefined) {
                if(obj.weather !== null && obj.weather !== undefined 
                    && obj.weather[0]['main']) {
                    const main = obj.weather[0]['main'];
                    this.setState({ main });
                }

                if(obj.main !== null && obj.main !== undefined 
                    && obj.main['temp'] !== null && obj.main['temp'] !== undefined) {
                    if(!isNaN(obj.main.temp)) {
                        const temp = Math.round(Number(obj['main']['temp']));
                        this.setState({ temp });
                    }
                }  
                //console.log(obj.weather[0]['main'], obj.main['temp'], new Date().toLocaleTimeString());             
            }
        });
    }

    componentWillUnmount() {
        clearInterval();
    }

    componentDidUpdate() {
    }
       
    render () {
        const { date, main, temp } = this.state;
        const d = Number(date.toTimeString().slice(0, 2));
        let weatherIcon = 'sun';

        if(main === 'Clear' && main !== null) { 
            if((d >= 22 && d <= 24) || (d >= 0 && d <= 5)) { 
                weatherIcon = 'moon'; 
            } else { weatherIcon = 'sun'; }
        }
        if(main === 'Rain' && main !== null) { 
            weatherIcon = 'cloud-rain';
        }
        if(main === 'Clouds' && main !== null) {
            if(d >= 22 && d <= 24) {
                weatherIcon = 'cloud-moon';
            } else {
                weatherIcon = 'cloud'; 
            }  
        }
        if(main === 'Mist' && main !== null) { weatherIcon = 'smog'; }
        if(main === 'Moderate Rain' && main !== null) { weatherIcon = 'cloud-sun-rain'; }

    
        return (
            <div className="footer">
                <section className="services">
                    <div className="contacts">
                        <h5 className="h5">Contacts us</h5>
                        <div>
                            <span>
                                <FontAwesomeIcon icon="map-marker-alt" color="#fff" pull="left" className="map-marker"></FontAwesomeIcon> 
                                Prohlada Avenue 1
                            </span>                          
                        </div>
                        <div>
                            <span>
                                <FontAwesomeIcon icon="globe-europe" color="#fff" pull="left" className="globe-europe"></FontAwesomeIcon>
                                Gabrovo, 5300 BG.
                            </span>
                        </div>
                        <div>
                            <span className="email">
                                <FontAwesomeIcon icon="envelope" color="#fff" pull="left" className="envelope"></FontAwesomeIcon>
                                Pavel.Runchev@gmail.com
                            </span>
                        </div>
                        <div>
                            <span className="gsm">
                                <FontAwesomeIcon icon="phone" color="#fff" pull="left" className="phone"></FontAwesomeIcon>
                                0879 999 436 Free call
                            </span>
                        </div>
                    </div>

                    <div className="links">
                        <h5 className="h5">Links</h5>
                        <div>
                            <ul>
                                <li><Link to="/specialThanks">Special Thanks</Link></li>
                                <li><Link to="/softwareTechnology">Software Technology</Link></li>
                                <li><Link to="/contact">Contact us</Link></li>
                                <li><Link to="/support">Support</Link></li>                              
                            </ul>
                        </div>
                    </div>

                    <div className="connect">                      
                        <div className="icons">
                            <FontAwesomeIcon icon={['fab', 'github']} color="#fff" id="github"/>
                            <FontAwesomeIcon icon={['fab', 'linkedin']} color="#fff" id="linkedin"/>
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} color="#fff" id="facebook"/>
                            <FontAwesomeIcon icon={['fab', 'twitter']} color="#fff" id="twitter"/>
                            <FontAwesomeIcon icon={['fab', 'gitlab']} color="#fff" id="gitlab"/>
                            <FontAwesomeIcon icon={['fab', 'skype']} color="#fff" id="skype"/>
                        </div>

                        <div>Upload code: <span className="font-weight-bold">Github</span></div>
                        <div>Deployed: <span className="font-weight-bold">Firebase</span></div>
                    </div>

                    <div className="copyright">
                        <div className="text-left">&copy; 2019 Free Gems Catalog</div>
                        <div className="text-left">All Rights Reserved!</div>
                        <div className="temperature">
                            {temp === 0 ? '' : 
                                <span className="font-weight-bold">Sofia:
                                    &ensp;<FontAwesomeIcon icon={weatherIcon} className="weather-icon"></FontAwesomeIcon>
                                    {temp === 0 ? '' : <span>&ensp; {temp} &#8451;</span> }
                                </span>    
                            }
                        </div>
                        
                        <div className="live-time">
                            <FontAwesomeIcon icon="clock" color="#fff" className="clock"></FontAwesomeIcon>
                            <span className="time">{date.toLocaleTimeString()}</span>
                        </div>
                    </div>
                </section>

                <section className="footer-bottom">
                    <FontAwesomeIcon icon={['fab', 'react']} id="react"></FontAwesomeIcon>
                    <div className="text-center">Powered by RAIDERS Team</div>
                </section>
            </div>
        );
    }
}

export default withRouter(Footer);