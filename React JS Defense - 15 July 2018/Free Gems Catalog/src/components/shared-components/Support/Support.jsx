import React from 'react';
import './Support.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Support extends React.Component {
    
    render () {
        return(
            <div className="container-fluid" id="support">
                <h2>Support</h2>
                <div className="inner-support">
                    <div className="box">
                        <h3 className="text-center">Operating System</h3>
                        <div>
                            <p className="row">
                                <FontAwesomeIcon icon={['fab', 'windows']} className="windows"></FontAwesomeIcon>
                                <span>Windows</span>
                            </p>
                            <p className="row">
                                <FontAwesomeIcon icon={['fab', 'android']} className="android"></FontAwesomeIcon>
                                <span>Android</span>
                            </p>
                        </div>
                        <h3 className="text-center">Support Browsers</h3>
                        <div>
                            <p className="row">
                                <FontAwesomeIcon icon={['fab', 'chrome']} className="chrome"></FontAwesomeIcon>
                                <span>Chrome v71.0.3578.98</span>
                            </p>
                            <p className="row">
                                <FontAwesomeIcon icon={['fab', 'firefox']} className="firefox"></FontAwesomeIcon>
                                <span>Firefox v64.0.2</span>
                            </p>
                            <p className="row">
                                <FontAwesomeIcon icon={['fab', 'edge']} className="edge"></FontAwesomeIcon>
                                <span>Edge v42.17134.1.0</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}