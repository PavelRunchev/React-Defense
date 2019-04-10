import React, { Component } from 'react';
import './NoFindingPage.scss';

class NoFindPage extends Component {
    render () {
        return (
            <div className="container-fluid" id="no-find-page">
                <h2>Not Found Page 404</h2>

                <div className="inner-no-page">
                    <img src={ require('../../../image/error.png') } alt="gallery"/>
                </div>
            </div>
        );
    }
}

export default NoFindPage;