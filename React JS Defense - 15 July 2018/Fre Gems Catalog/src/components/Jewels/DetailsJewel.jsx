import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './DetailsJewel.css';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';
import ReviewJewel from './ReviewJewel';

class DetailsJewel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jewel: {},
            errors: false,
            raiting: 5,
            comment: '',
            reviews: [],
            raitingUsers: 0
        }

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        let jewelId = this.props.match.params.id;
        if(jewelId !== undefined) {
            this.collectJewel(jewelId);
            this.all(jewelId);
        }
    }

    collectJewel(id) {
        ReqHandler.detailsMyJewel(id)
                .then(detailJewel => {
                    this.setState({jewel: detailJewel});
                });
    }

    all(id) {
        ReqHandler.allReviews(id).then(rews => {
            let allRating = 0;
            rews.forEach(c => allRating += c.raiting);
            this.setState({reviews: rews});
            this.setState({raitingUsers: allRating});
        });
    }

    onClick(e) {
        e.preventDefault();
        let jewelId = this.props.match.params.id;
        ReqHandler.deleteMyJewel(jewelId).then(() => {
            toastr.success('your be jewel is destroyed!');
            this.props.history.push('/upgradedJewels');
        });
    }

    async onSubmit(e) {
        e.preventDefault();
        let raiting = Number(this.state.raiting);
        let comment = this.state.comment;
        let jewelId = this.state.jewel._id;
        let author = localStorage.getItem('username');

        if(comment === '') {
            return toastr.warning("Comment area cannot be empty!");
        }
        let newReview = {
            jewelId,
            author,
            raiting,
            comment
        };

        let res = await ReqHandler.createReview(newReview);
        this.state.reviews.push(res);
        this.all(jewelId);
        toastr.success('create review successful');
        let editJewel = {
            name: this.state.jewel.name,
            owner: this.state.jewel.owner,
            imageUrl: this.state.jewel.imageUrl,
            gems: this.state.jewel.gems,
            type: this.state.jewel.type,
            raiting: (Number(this.state.raitingUsers) + raiting)
        };
 
        ReqHandler.editJewel(jewelId, editJewel).then(editJewel => {
            console.log(editJewel);
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render () {
        const isAdmin = localStorage.getItem('isAdmin') !== null;

        if(this.state.jewel === undefined) {
            return (
                <div className="detailsLoading">
                    <h1>Loading ...</h1>
                </div>
            )
        }
        return (
            <div className="detailsJewel">
                <div className="public"> 
                    <h1>Name: {this.state.jewel.name}</h1>
                    <p><strong>Type:</strong> {this.state.jewel.type}</p>
                    <p><strong>Gems:</strong> {this.state.jewel.gems}</p>
                    <p><strong>Owner:</strong> {this.state.jewel.owner}</p>
                    <img className="image" src={this.state.jewel.imageUrl} alt="jewel" width="550" height="550"/>
                    <div className="controls">
                        {isAdmin && <button onClick={this.onClick}>Destroy</button>}
                        {isAdmin && <Link to={`/editJewel/${this.props.match.params.id}`}>Edit</Link>}
                    </div>
                    <div>
                        <strong>Raiting: {this.state.raitingUsers}</strong>
                    </div>
                </div>
                <div className="comment">
                    
                    <form onSubmit={this.onSubmit} className="commentForm">
                        <h2>Leave a Raiting and Review</h2>
                       
                        <div>
                            Rating:
                            <select onChange={this.onChange} value={this.state.raiting} name="raiting">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                       
                        <label>Comment:</label>
                        <textarea
                            onChange={this.onChange}
                            name="comment"
                            value={this.state.comment}
                            style={{ resize: 'none', width: '37%' }} />
                        <input type="submit" value="Post review" />
                    </form>
                    <div className="userComments">
                        {this.state.reviews.length === 0 
                            ? <div className="commentForm"><strong>No Reviews</strong></div> 
                            : this.state.reviews.map(r => {
                                return <ReviewJewel key={r._id} props={r} id={this.props.match.params.id}/>
                            })
                        }
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withRouter(DetailsJewel);