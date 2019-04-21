import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './MyGem.scss';

const MyGem = (props) => {
    return (
        <div className="myGem">
            <Link to={`/myRoom/privateRoomSection/myGemDetails/${props.props._id}`}>
                <div className="card-title gem-name">Name: {props.props.gemsName}</div>
                <div className="gem-set">For Set: {props.props.type}</div>
                <img src={props.props.imageUrl} className="gem-image" alt="gallery" />           
            </Link>
        </div>
    );
};


export default withRouter(MyGem);