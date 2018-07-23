import React, { Component } from 'react';
import './CreateGems.css';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';
import ReqHandler from '../../utils/ReqHandler';

class CreateGems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            color: '',
            imageUrl: '',
            weight: '',
            origin: '',
            type: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        let name = this.state.name;
        let color = this.state.color;
        let weight = Number(this.state.weight);
        let imageUrl = this.state.imageUrl;
        let origin = this.state.origin;
        let type = this.state.type;

        if(name === '' || color === '' || weight < 0 || imageUrl === '' || origin === '' || type === '') {
            toastr.warning("Fields cannot be empty to create Gem!");
            return;
        }

        let newGem = {
            name,
            color,
            weight,
            imageUrl,
            origin,
            type
        };

        console.log(newGem);
        ReqHandler.createGem(newGem).then(gems => {
            console.log(gems);
            toastr.success("created gem successful");
            this.props.history.push('/listGems');
        });
    }

    render() {
        return (
            <div className="createGem">
                <h1>Create Gem</h1>
                <strong>All text fields should start with a Capital Letter!!!</strong><br/>
                <strong>The field Name should be the name of gems!!!</strong><br/>
                <strong>The fields Type should be Bracelet, Pendant or Ring!!!</strong>
                <form onSubmit={this.onSubmitHandler} className="form">
                    <label>Name:</label>
                    <input
                        name="name"
                        placeholder="name"
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                    <label>Color:</label>
                    <input
                        name="color"
                        placeholder="color"
                        onChange={this.onChangeHandler}
                        label="Color"
                    />
                    <label>Weight:</label>
                    <input
                        name="weight"
                        type="number"
                        step="any"
                        placeholder="weight"
                        onChange={this.onChangeHandler}
                        label="weight"
                    />
                    <label>ImageUrl:</label>
                    <input
                        name="imageUrl"
                        placeholder="imageUrl"
                        onChange={this.onChangeHandler}
                        label="ImageUrl"
                    />
                    <label>Origin:</label>
                    <input
                        name="origin"
                        placeholder="origin"
                        onChange={this.onChangeHandler}
                        label="Origin"
                    />
                     <label>Type:</label>
                    <input
                        name="type"
                        placeholder="type"
                        onChange={this.onChangeHandler}
                        label="Type"
                    />
                 
                    <input type="submit" value="Create" />
                </form>
            </div>
        );
    }
}

export default withRouter(CreateGems);