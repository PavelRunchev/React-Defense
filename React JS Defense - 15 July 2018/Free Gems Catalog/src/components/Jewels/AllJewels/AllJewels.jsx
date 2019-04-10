import React, { Component } from 'react';
import './AllJewels.scss';
import { withRouter } from 'react-router-dom';
import Preloader from '../../HOC/Preloader';

class AllJewelsBase extends Component {
    
    render () {
        console.log(this.props.data);
        return (
            <div className="container-fluid" id="allJewels">
                <h2>Jewels Section</h2>
            </div>
        );
    }
}

const AllJewels = Preloader(AllJewelsBase);

export default withRouter(AllJewels);