import React from 'react';
import MyJewel from '../../Model/MyJewel';

const MyJewelsMap = (props) => {
    let data = [];
    console.log(props);
    if(props.myJewels.length > 0) {
        data = props.myJewels.sort((a,b) => b._kmd.lmt.localeCompare(a._kmd.lmt));
    }
    console.log(data);
    
    return (
        <div className="myJewels">
            {data.length === 0 ? <h4>No have upgrade Jewels!</h4> 
                : data.map((g, i) => {
                    return <MyJewel key={g._id} props={g}/>;
                })}
        </div>
    );
};

export default MyJewelsMap;