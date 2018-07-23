import React from 'react';
import DateConvertor from '../../utils/DateConvertor';
import { Link } from 'react-router-dom';
import './ReviewJewel.css';

let Review = (props) => {
    let ownerComment = <Link to={`/deleteComment/${props.props._id}`} className="deleteLink" >delete</Link>;
    const trueForDelete = localStorage.getItem('isAdmin') !== null || localStorage.getItem('username');
    return (
        <article className="com-rew">
            <header>Raiting: {props.props.raiting}</header>
            <p>comment: {props.props.comment}</p>
            <strong>posted {DateConvertor(props.props._kmd.ect)} by {props.props.author} </strong>
            {trueForDelete ? ownerComment : ''}
        </article>
    );
}

export default Review;