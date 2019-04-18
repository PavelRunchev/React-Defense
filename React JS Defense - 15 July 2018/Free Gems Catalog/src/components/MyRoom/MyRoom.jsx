import React, { Component } from 'react';
import './MyRoom.scss';
import { withRouter } from 'react-router-dom';
import MyJewelsList from './MyJewelsList/MyJewelsList';
import MyGems from './MyGems/MyGems';
import Preloader from '../HOC/Preloader';

class MyRoomBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myJewels: this.props.data
        };
    }
    
    render () {
        console.log(this.state.myJewels);
        return (
            <div className="container-fluid myRoom">
                <h2>Your Private Room</h2>
                <div className="inner-myRoom">
                    <MyGems value={this.state.myJewels}/>
                    <MyJewelsList url={this.props.match.url}/>
                </div>
            </div>
        );
    }
}

const MyRoom = Preloader(MyRoomBase);

export default withRouter(MyRoom);