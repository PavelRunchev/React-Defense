import React, { Component } from 'react';
import './MyRoom.scss';
import { withRouter } from 'react-router-dom';
import Preloader from '../HOC/Preloader';

class MyRoomBase extends Component {
    
    render () {
        console.log(this.props.data);
        return (
            <div className="container-fluid" id="myRoom">
                <h2>Your Room</h2>
            </div>
        );
    }
}

const MyRoom = Preloader(MyRoomBase);

export default withRouter(MyRoom);