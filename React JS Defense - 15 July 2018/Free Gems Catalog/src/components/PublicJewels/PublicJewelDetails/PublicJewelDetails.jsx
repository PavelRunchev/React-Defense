import React, { Component } from 'react';
import './PublicJewelDetails.scss';
import { withRouter, NavLink,  Link } from 'react-router-dom';
import RequestPublicJewels from '../../../utils/RequestPublicJewels';
import RequestComments from '../../../utils/RequestComments';
import PublicJewelDetailsModel from '../Model/PublicJewelDetailsModel';
import Comment from '../Comments/Model/Comment';
import CommentForm from '../Comments/CommentForm/CommentForm';
import Loading from '../../Loading/Loading';
import toastr from 'toastr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from 'sweetalert';
import auth from '../../../utils/Auth';

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

    async onDeleteJewel(e) {
        e.preventDefault();
        
        const willDeleteJewel = await swal({
            title: 'Are you sure want to delete?',
            text: 'It will be deleted permanently from base?',
            icon: 'warning',
            dangerMode: true,
            showCancelButton: true,
        });

        if (willDeleteJewel) {
            const jewelId = this.state.jewel._id;

            if(jewelId !== undefined) {
                try{
                    const res = await RequestPublicJewels.deletePublicJewel(jewelId);
                    if(res.error) {
                        return toastr.warning('Invalid Credential!You Login!');
                    }

                    swal({ title: 'The jewel is deleted successful!', icon: 'success' });
                    toastr.success('The jewel is deleted successful!');
                    this.props.history.push('/publicJewels/allPublicJewels');
                }catch(error) { console.log(error.message); }
            }
        }
    }

    async onDeleteComment(id) {
        const { jewel, jewelId } = this.state;
        let comments = this.state.comments;
        if(id !== undefined) {
            const willDelete = await swal({
                title: 'Are you sure want to delete?',
                text: 'It will be deleted permanently from base?',
                icon: 'warning',
                dangerMode: true,
            });

            if(willDelete) {
                try{
                    if(comments.some(c => c._id === id)) {
                        const commentRating = comments.filter(c => c._id === id)[0].raiting;
                        const res = await RequestComments.deleteComment(id);
                        if(res.error) {
                            return toastr.warning('Invalid Credential!You Login!');
                        }

                        swal({ title: 'The comment is deleted successful!', icon: 'success' }); 
                        toastr.success('The comment is deleted succesful!');
                        comments = comments.filter(c => c._id !== id);
                        this.setState({ comments });

                        const calcRating = Number(jewel.raiting) - Number(commentRating) <= 0 ? 0 : Number(jewel.raiting) - Number(commentRating);
                        const updateRatingToJewel = {
                            name: jewel.name,
                            owner: jewel.owner,
                            imageUrl: jewel.imageUrl,
                            gems: jewel.gems,
                            type: jewel.type,
                            raiting: calcRating
                        };
            
                        const updatedJewel = await RequestPublicJewels.editPublicJewel(jewelId, updateRatingToJewel);
                        if(updatedJewel.error) {
                            return toastr.warning('Invalid Credential!You Login!');
                        }
            
                        this.setState({ 
                            jewel: updatedJewel, 
                            rating: updatedJewel.raiting 
                        });
                    }                   
                }catch(error) { console.log(error.message); }
            }
        }
    }

    onChangeHandler(e) { this.setState({ [e.target.name]: e.target.value }); }

    async onSubmitComment(e) {
        e.preventDefault();
        const { jewel, rating, comment, jewelId } = this.state;
        
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

        try{
            const res = await RequestComments.createComment(newComment);
            if(res.error) {
                return toastr.warning('Invalid Credential!You Login!');
            }

            this.state.comments.unshift(res);
            toastr.success('The comment is posted Successful!');

            const updateRatingToJewel = {
                name: jewel.name,
                owner: jewel.owner,
                imageUrl: jewel.imageUrl,
                gems: jewel.gems,
                type: jewel.type,
                raiting: Number(jewel.raiting) + Number(rating)
            };

            const updatedJewel = await RequestPublicJewels.editPublicJewel(jewelId, updateRatingToJewel);
            if(updatedJewel.error) {
                return toastr.warning('Invalid Credential!You Login!');
            }

            this.setState({ 
                jewel: updatedJewel, 
                rating: updatedJewel.raiting 
            });
        }catch(error) { console.log(error.message); }  
    }

    render () {
        const { jewel, imageUrl, comments } = this.state;
        return (
            <div className="container-fluid publicJewel-details">
                <h2>Public Jewel Section</h2>

                {imageUrl === '' ? <Loading/> : <div className="inner-publicJewel-details">
                    {auth.isLogged() && auth.isAdmin() && <Link to={`/publicJewels/publicJewelEdit/${jewel._id}`}>
                        <FontAwesomeIcon icon="edit" size="3x" className="edit-icon"></FontAwesomeIcon>
                    </Link>}
                    {auth.isLogged() && auth.isAdmin() && <button onClick={this.onDeleteJewel}>
                        <FontAwesomeIcon icon="trash-alt" size="2x" className="trash"></FontAwesomeIcon>
                    </button>}
                   
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