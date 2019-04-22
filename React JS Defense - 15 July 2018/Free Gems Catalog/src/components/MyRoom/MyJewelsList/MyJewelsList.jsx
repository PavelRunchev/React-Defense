import React from 'react';
import './MyJewelsList.scss';
import MyJewelMap from './MyJewelsMap/MyJewelsMap';
import { ContextConsumer } from '../MyRoom';

const MyJewelsList = (props) => {
    return (
        <div className="inner-myJewels">
            <h3 className="h2">Your Jewels</h3>
            <div className="buttonForViewMyJewels">
                <button onClick={props.handler} className="viewMyJewels">View Jewels</button>
            </div>
            {!props.value ? <h3>No click for your Jewels!</h3> : 
                <ContextConsumer>
                    {
                        (myJewels) => <MyJewelMap myJewels={myJewels}/>
                    }
                </ContextConsumer>
            }
        </div>
    );
};

export default MyJewelsList;
