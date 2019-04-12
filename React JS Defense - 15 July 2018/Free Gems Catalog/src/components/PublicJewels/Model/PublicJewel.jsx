import React from 'react'; 
import './PublicJewel.scss';
import { Link, withRouter } from 'react-router-dom';

const PublicJewel = (props) => {
    const publicJewel = props.props;
    return (
        <div className="publicJewel">
            <div className="card-title jewel-name">Name: {publicJewel.name}</div>
            <div className="jewel-rating">Type: {publicJewel.type}</div>
            <img src={publicJewel.imageUrl} className="publicJewel-image" alt="gallery" />           
            <div className="card-text jewel-create-time">Rating: {publicJewel.raiting}</div>
            <div className="jewel-view">              
                <Link to={`/jewels/detailsJewel/${publicJewel._id}`}>Details</Link>
            </div>     
        </div>
    );
};

export default withRouter(PublicJewel);