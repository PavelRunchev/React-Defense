import React from 'react';
import './SoftwareTechnology.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SoftwareTechnology extends React.Component {
    render () {
        return(
            <div className="container-fluid" id="software-technology">
                <h2 className="h2 text-center">Software Technology</h2>
                <div className="inner-software-technology">
                    <div className="box ">
                        <div>
                            <FontAwesomeIcon icon={['fab', 'react']} className="react"></FontAwesomeIcon>
                            <span>REACT v16.8</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={['fab', 'bootstrap']} className="bootstrap"></FontAwesomeIcon>
                            <span>BOOTSTRAP v5.8</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={['fab', 'html5']} className="html5"></FontAwesomeIcon> 
                            <span>HTML 5</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={['fab', 'sass']} className="sass"></FontAwesomeIcon>
                            <span>SASS v4.11</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}