import React from 'react';
import './MyJewelsList.scss';
import MyJewel from '../Model/MyJewel';

const MyJewelsList = (props) => {
    let myJewelsRender;
    //sort by create date!
    if(props.data !== undefined) {
        const data = props.data.sort((a,b) => b._kmd.lmt.localeCompare(a._kmd.lmt));
        myJewelsRender = <div className="myJewels">
            {data.length === 0 ? <h4>No have upgrade Jewels!</h4> 
                : data.map((g, i) => {
                    return <MyJewel key={g._id} props={g}/>;
                })}
        </div>;
    }

    return (
        <div className="inner-myJewels">
            <h3 className="h2">Your Jewels</h3>
            <div className="buttonForViewMyJewels">
                <h3>Click to view your jewels!</h3>
                <button onClick={props.handler} className="viewMyJewels">View Jewels</button>
            </div>
            {myJewelsRender}
        </div>
    );
};

export default MyJewelsList;
