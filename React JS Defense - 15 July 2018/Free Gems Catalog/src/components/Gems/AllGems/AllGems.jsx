import React, { Component } from 'react';
import './AllGems.scss';
import { withRouter } from 'react-router-dom';
import Preloader from '../../HOC/Preloader';

class AllGemsBase extends Component {
    
    render () {
        console.log(this.props.data);
        return (
            <div className="container-fluid" id="allGems">
                <h2>Gems Section</h2>
            </div>

        );
    }
}

const AllGems = Preloader(AllGemsBase);

export default withRouter(AllGems);