import React from 'react';
import { Link } from 'react-router-dom';
import './Gem.css';
import DateConvertor from '../../utils/DateConvertor';

let Gem = props => {
        return (
            <div className="gem">
                <div className="index">
                    <span>{props.props.index}</span>
                </div>
                <div className="gemName">
                    <strong>{props.props.name}</strong>
                </div>
                <div className="image">      
                    <img src={props.props.imageUrl} alt="" width="350" height="350"/>           
                </div>
                <div className="update">
                    <strong>{DateConvertor(props.props._kmd.ect)}</strong>
                </div>
                <div className="controls">
                    <Link to={`/detailsGem/${props.props._id}`}>Details</Link>
                </div>
            </div>
        )
}

export default Gem;