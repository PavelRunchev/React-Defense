import React from 'react';
import { Link } from 'react-router-dom';
import './Jewel.css';
import DateConvertor from '../../utils/DateConvertor';

let Jewel = props => {
        return (
            <div className="jewel">
                <div className="index">
                    <strong>{props.props.index}</strong>
                </div>
                <div className="gemName">
                    <strong>{props.props.name}</strong>
                </div>
                <div className="raiting">
                    <strong>Raiting: {props.props.raiting}</strong>
                </div>
                <div className="image">      
                    <img src={props.props.imageUrl} alt="" width="350" height="350"/>           
                </div>
                <div className="update">
                    <strong>published: {DateConvertor(props.props._kmd.ect)}</strong>
                </div>
                <div className="controls">
                    <Link to={`/detailsJewel/${props.props._id}`}>Details</Link>
                </div>
            </div>
        )
}

export default Jewel;