import React, { Component } from 'react';
import './MyRoom.scss';
import { withRouter } from 'react-router-dom';
import MyJewelsList from './MyJewelsList/MyJewelsList';
import MyGems from './MyGems/MyGems';
import Preloader from '../HOC/Preloader';

const Context = React.createContext([]);

export const ContextProvider = Context.Provider;
export const ContextConsumer = Context.Consumer;

class MyRoomBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myJewels: this.props.data
        };
    }
    
    render () {
        const { myJewels } = this.state;

        return (
            <div className="container-fluid myRoom">
                <h2>Your Private Room</h2>
                <div className="inner-myRoom">
                    <ContextProvider value={myJewels}>
                        <MyGems myJewels={this.state.myJewels}/>
                    </ContextProvider>
                    
                    <MyJewelsList url={this.props.match.url} myJewels={myJewels}/>
                </div>
            </div>
        );
    }
}

const MyRoom = Preloader(MyRoomBase);

export default withRouter(MyRoom);