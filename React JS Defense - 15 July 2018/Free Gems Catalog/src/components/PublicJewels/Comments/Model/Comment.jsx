import React, { Fragment } from 'react';
import './Comment.scss';
import { withRouter } from 'react-router-dom';
import DateConvertor from '../../../../utils/DateConvertor';
import auth from '../../../../utils/Auth';

const Comment = (props) => {
    const comment = props.props;
    const ownerComment = localStorage.getItem('username') === comment.author;

    return (
        <Fragment>
            {comment === undefined ? '' : 
                <div className="comment">
                    <h5>Rating: {comment.raiting}</h5>
                    <p><span>comment:</span> {comment.comment}</p>
                    <p>posted <span>{DateConvertor(comment._kmd.ect)}</span> by <span>{comment.author}</span> 
                        {((auth.isLogged() && auth.isAdmin()) 
                        || (auth.isLogged() && auth.isModerator())
                        || (ownerComment && auth.isLogged())) 
                        && <button onClick={() => props.handler(comment._id)} className="deleteLink">delete</button>}
                    </p>
                </div>
            }
        </Fragment>
    );
};

export default withRouter(Comment);