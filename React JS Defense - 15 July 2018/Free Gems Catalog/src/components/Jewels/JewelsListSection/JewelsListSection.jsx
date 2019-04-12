import React, { Component } from 'react';
import './JewelsListSection.scss';
import { withRouter } from 'react-router-dom';
import JewelsList from './JewelsList';
import Loading from '../../Loading/Loading';

class AllJewels extends Component {
    render () {
        return (
            <div className="container-fluid" id="JewelsSection">
                <h2>Jewels Section</h2>
                {this.props.data !== undefined ? 
                    <Loading/> : 
                    <JewelsList url={this.props.match.url}/>
                }
            </div>
        );
    }
}

export default withRouter(AllJewels);