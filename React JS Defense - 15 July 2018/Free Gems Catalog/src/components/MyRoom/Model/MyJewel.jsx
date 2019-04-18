import React from 'react'; 
import './MyJewel.scss';
import { Link, withRouter } from 'react-router-dom';
import DateConvertor from '../../../utils/DateConvertor';

const MyJewel = (props) => {
    const myJewel = props.props;
    return (
        <div className="myJewel">
            <div className="card-title jewel-name">Name: {myJewel.name}</div>
            <div className="jewel-rating">Type: {myJewel.type}</div>
            <img src={myJewel.imageUrl} className="publicJewel-image" alt="gallery" />           
            <div className="card-text jewel-create-time">Created: {DateConvertor(myJewel._kmd.lmt)}</div>
            <div className="jewel-view">              
                <Link to={`/publicJewels/publicJewelDetails/${myJewel._id}`}>Details</Link>
            </div>     
        </div>
    );
};

export default withRouter(MyJewel);