import React from 'react';
import './MyJewelView.css';
import { Link } from 'react-router-dom';

let MyJewelView = props => {
        return (
            <div className="myJewel">
                    <p><strong>Name:</strong> {props.props.name}</p>
                    <p><strong>Owner:</strong> {props.props.owner}</p>
                    <p><strong>Gems:</strong> {props.props.gems}</p>
                    <p><strong>Type:</strong> {props.props.type}</p>
                    <div className="image">      
                        <img src={props.props.imageUrl} alt="" width="450" height="450"/>           
                    </div>
                    <div className="controls">
                        <Link to={`/myDetailsJewel/${props.props._id}`}>Details</Link>
                    </div>
            </div>
        )
}

export default MyJewelView;