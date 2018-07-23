import React from 'react';
import './MyGemView.css';
import { Link, withRouter } from 'react-router-dom';

let MyGemView = props => {
        return (
            <div className="myGem">
                <p><strong>Name:</strong> {props.props.gemsName}</p>
                <p><strong>Color:</strong> {props.props.color}</p>
                <p><strong>Type:</strong> {props.props.type}</p>
                <p><strong>Owner:</strong> {props.props.owner}</p>
                <div className="image">      
                    <img src={props.props.imageUrl} alt="" width="250" height="250"/>           
                </div>
                <div className="controls">
                    <Link to={`/myDetailsGem/${props.props._id}`}>Details</Link>
                </div>
            </div>
        )
}

export default withRouter(MyGemView);