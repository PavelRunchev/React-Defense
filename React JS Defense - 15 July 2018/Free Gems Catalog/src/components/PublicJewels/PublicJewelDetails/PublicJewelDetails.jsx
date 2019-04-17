import React, { Component } from 'react';
import './PublicJewelDetails.scss';
import { withRouter, NavLink } from 'react-router-dom';
import RequestPublicJewels from '../../../utils/RequestPublicJewels';
import RequestComments from '../../../utils/RequestComments';
import PublicJewelDetailsModel from '../Model/PublicJewelDetailsModel';
import Comment from '../Comments/Model/Comment';
import CommentForm from '../Comments/CommentForm/CommentForm';
import Loading from '../../Loading/Loading';
import toastr from 'toastr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PublicJewelDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jewel:  {},
            jewelId: '',
            imageUrl: '',
            comments: [],
            coment: '',
            rating: 0
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitComment = this.onSubmitComment.bind(this);
        this.onDeleteComment = this.onDeleteComment.bind(this);
        this.onDeleteJewel = this.onDeleteJewel.bind(this);
    }

    componentDidMount() {
        const jewelId = this.props.match.params.id;
        if(jewelId !== undefined) {
            this.getJewel(jewelId);
            this.getAllMessageToJewel(jewelId);
        }
    }

    async getJewel(id) {
        try{
            const jewel = await RequestPublicJewels.getJewelById(id);
            if(jewel.error) {
                return toastr.error('Invalid Credential!You Login!');
            }
    
            this.setState({ 
                jewel, 
                jewelId: jewel._id,
                imageUrl: jewel.imageUrl,
            });
        }catch(error) { console.log(error.message); }
    }

    async getAllMessageToJewel(id) {
        try{
            const comments = await RequestComments.allCommentsToCurrentJewel(id);
            if(comments.error) {
                return toastr.error('Invalid Credential!You Login!');
            }
    
            this.setState({ comments });
        }catch(error) { console.log(error.message); }
    }

    onDeleteJewel(e) {
        e.preventDefault();
        // todo
    }

    onDeleteComment(id) {

        // todo
    }

    onChangeHandler(e) { 
        console.log(e.target);
        if(e.target.name === NaN) {
            return;
        }
        this.setState({ [e.target.name]: e.target.value }); 
    }

    onSubmitComment(e) {
        e.preventDefault();
        const { jewel, rating, comment } = this.state;
        
        if(comment === '' || comment === undefined || comment === null) {
            return toastr.warning('Textarea cannot must be empty!');
        }

        if(isNaN(Number(rating))) {
            return toastr.warning('Please select option value which is digit!');
        }

        const newComment = {
            raiting: Number(rating) || this.state.rating,
            comment: comment,
            jewelId: jewel._id,
            author: localStorage.getItem('username')
        };

        
    }

    render () {
        const { jewel, imageUrl, comments } = this.state;
        return (
            <div className="container-fluid publicJewel-details">
                <h2>Public Jewel Section</h2>

                {imageUrl === '' ? <Loading/> : <div className="inner-publicJewel-details">
                    <button onClick={this.onDeleteJewel}>
                        <FontAwesomeIcon icon="trash-alt" size="2x" className="trash"></FontAwesomeIcon>
                    </button>
                    <div className="view-publicJewel">

                        <div className="jewel-model">
                            <PublicJewelDetailsModel value={jewel}/>
                            <NavLink to={`/publicJewels/publicJewelDetails/enlargmentJewel/${jewel.imageUrl}`} className="enlargement-image">
                                <FontAwesomeIcon icon="eye" size="2x" className="eye"></FontAwesomeIcon>
                            </NavLink>
                            <h4>Enlargement image</h4>
                        </div>
                    
                        <div className="comments-section">
                            <CommentForm handler={[this.onSubmitComment, this.onChangeHandler]}/>
                        
                            {comments.length === 0 ? 
                                <h3 className="h3 text-center font-weight-bold">No Comments!</h3> 
                                : comments.map(comment => {
                                    return  <Comment key={comment._id} props={comment} handler={this.onDeleteComment}/>;
                                })
                            }
                        </div>
                    </div>
                </div>
                }

            </div>
        );
    }
}

export default withRouter(PublicJewelDetails);