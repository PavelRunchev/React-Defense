import React, { Component } from 'react';
import './PublicJewelDetails.scss';
import { withRouter } from 'react-router-dom';
import RequestPublicJewels from '../../../utils/RequestPublicJewels';

class PublicJewelDetails extends Component {
    render () {
        return (
            <div>
                <h2>Public  Jewel Section</h2>
            </div>
        );
    }
}

export default withRouter(PublicJewelDetails);