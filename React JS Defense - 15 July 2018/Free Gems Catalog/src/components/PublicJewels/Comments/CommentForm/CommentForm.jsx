import React, { Fragment } from 'react';
import './CommentForm.scss';

const CommentForm = (props) => {
    const onSubmitComment = props.handler[0];
    const onChangeHandler = props.handler[1];

    return (
        <Fragment>
            {props.handler.length === 0 ? '' : 
                <Fragment>
                    <form onSubmit={onSubmitComment}>
                        <p className="font-weight-bold text-light">Give rating and comment for this jewel.</p>
                        <div className="form-group">
                            <label htmlFor="exampleSelect2" className="text-light">Rating:</label>
                            <select name="rating" onChange={onChangeHandler} className="form-control" id="exampleSelect2">
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            <button type="submit" className="post-button">Post</button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="textarea">Textarea</label>
                            <textarea onChange={onChangeHandler} name="comment" className="form-control" id="textarea" rows="5"></textarea>
                        </div>
                    </form> 
                </Fragment>
            }
        </Fragment>
    );
};

export default CommentForm;