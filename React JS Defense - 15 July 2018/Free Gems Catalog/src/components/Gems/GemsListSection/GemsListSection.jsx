import React, { Component } from 'react';
import './GemsListSection.scss';
import { withRouter } from 'react-router-dom';
import GemsList from './GemsList';
import Loading from '../../Loading/Loading';


class GemsListSection extends Component {
    render () {
        return (
            <div className="container-fluid" id="gemsSection">
                <h2>Gems Section</h2>
                {this.props.data !== undefined ? 
                    <Loading/> : 
                    <GemsList url={this.props.match.url}/>
                }
            </div>
        );
    }
}

export default withRouter(GemsListSection);