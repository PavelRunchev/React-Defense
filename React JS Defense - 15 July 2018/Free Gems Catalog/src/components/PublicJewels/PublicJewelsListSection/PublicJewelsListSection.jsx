import React, { Component } from 'react';
import './PublicJewelsListSection.scss';
import { withRouter } from 'react-router-dom';
import PublicJewelsList from './PublicJewelsList';

class PublicJewelsListSection extends Component {
    render () {
        return (
            <div className="container-fluid" id="publicJewels">
                <h2>All Public Jewels</h2>
                <PublicJewelsList url={this.props.match.url}/>
            </div>
        );
    }
}

export default withRouter(PublicJewelsListSection);