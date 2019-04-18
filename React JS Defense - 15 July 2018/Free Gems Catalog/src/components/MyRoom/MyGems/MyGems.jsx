import React, { Component } from 'react';
import './MyGems';
import { withRouter } from 'react-router-dom';

class MyGems extends Component {
    render() {
        return(
            <div className="myGemsList">
                <h2 className="h2 text-center">Your Gems</h2>
            </div>
        );
    }
}

export default withRouter(MyGems);