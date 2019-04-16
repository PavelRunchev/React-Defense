import React from 'react'; 
import './Jewel.scss';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Jewel = (props) => {
    const jewel = props.props;
    return (
        <div id="jewel">
            <div className="card-title jewel-name">Name: {jewel.name}</div>
            <div className="jewel-gems">Gems: {jewel.gems}</div>
            <img src={jewel.imageUrl} className="jewel-image" alt="gallery" />           
            <div className="card-text jewel-set">Set: {jewel.type}</div>
            <div className="jewel-view">              
                <Link to={`/jewels/editJewel/${jewel._id}`}>
                    <FontAwesomeIcon icon="edit" size="3x" id="edit-icon"></FontAwesomeIcon>
                </Link>
            </div>     
        </div>
    );
};

export default withRouter(Jewel);