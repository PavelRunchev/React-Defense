import React, { Component } from 'react';
import './EditJewel.css';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';
import ReqHandler from '../../utils/ReqHandler';

class EditJewel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            owner: '',
            imageUrl: '',
            gems: '',
            type: '',
            raitnig: 0,
            jewel: {}
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        ReqHandler.detailsMyJewel(this.props.match.params.id).then(curJewel => {
            this.setState({jewel: curJewel});
        })
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        let jewelId = this.props.match.params.id;
        let name = this.state.name || this.state.jewel.name;
        let owner = this.state.owner || this.state.jewel.owner;
        let imageUrl = this.state.imageUrl || this.state.jewel.imageUrl;
        let gems = this.state.gems || this.state.jewel.gems;
        let type = this.state.type || this.state.jewel.type;
        let raiting = this.state.raitnig || this.state.jewel.raiting;

        if(name === '' || owner === '' || imageUrl === '' || gems === '' || type === '' || raiting < 0) {
            toastr.error("Fields cannot be empty to create Jewel!");
            return;
        }

        let editJewel = {
            name,
            owner,
            imageUrl,
            gems,
            type,
            raiting
        };

        ReqHandler.editJewel(jewelId, editJewel).then(() => {
            toastr.success("edit jewel successful");
            this.props.history.push(`/detailsJewel/${jewelId}`);
        });
    }

    render() {
        return (
            <div className="edit">
                <h1>Edit Jewel</h1>
                <strong>just filled in the current field you want to edit!</strong>
                <form onSubmit={this.onSubmitHandler} className="formEdit">
                    <label>Name:</label>
                    <input
                        name="name"
                        placeholder={this.state.jewel.name}
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                      <label>Owner:</label>
                    <input
                        name="owner"
                        placeholder={this.state.jewel.owner}
                        onChange={this.onChangeHandler}
                        label="Owner"
                    />
                      <label>Raiting:</label>
                    <input
                        type="number"
                        name="raiting"
                        placeholder={this.state.jewel.raiting}
                        onChange={this.onChangeHandler}
                        label="Raiting"
                    />
                     <label>Gems:</label>
                    <input
                        name="gems"
                        placeholder={this.state.jewel.gems}
                        onChange={this.onChangeHandler}
                        label="Gems"
                    />
                    <label>ImageUrl:</label>
                    <input
                        name="imageUrl"
                        placeholder={this.state.jewel.imageUrl}
                        onChange={this.onChangeHandler}
                        label="ImageUrl"
                    />
                
                     <label>Type:</label>
                    <input
                        name="type"
                        placeholder={this.state.jewel.type}
                        onChange={this.onChangeHandler}
                        label="Type"
                    />
                 
                    <input type="submit" value="Edit" className="submitEdit"/>
                </form>
            </div>
        );
    }
}

export default withRouter(EditJewel);