import React, { Component } from 'react';
import './AllPublicJewels.scss';
import { withRouter } from 'react-router-dom';
import Preloader from '../../HOC/Preloader';

class AllPublicJewelsBase extends Component {
    
    render () {
        console.log(this.props.data);
        return (
            <div className="container-fluid" id="allPublicJewels">
                <h2>All Public Jewels</h2>
            </div>

        );
    }
}

const AllPublicJewels = Preloader(AllPublicJewelsBase);

export default withRouter(AllPublicJewels);