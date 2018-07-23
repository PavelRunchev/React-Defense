import React, { Component } from 'react';
import './CreateJewel.css';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';
import ReqHandler from '../../utils/ReqHandler';

class CreateJewel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: '',
            imageUrl: '',
            gems: '',
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
        let type = this.state.type;
        let gems = this.state.gems;
        let imageUrl = this.state.imageUrl;

        if(name === '' || type === '' || gems === '' || imageUrl === '') {
            toastr.error("Fields cannot be empty to create Jewel!");
            return;
        }

        let newJewel = {
            name,
            type,
            gems,
            imageUrl,
        };

        
        console.log(newJewel);
        ReqHandler.createJewel(newJewel).then(gems => {
            toastr.success("created jewel successful");
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div className="createJewel">
                <h1>Create Jewel</h1>
                <strong>All text fields should start with a Capital Letter!!!</strong><br/>
                <strong>The field Gems should be the name of gems(Ruby,Amethyst,Sapphire)!!!</strong><br/>
                <strong>The fields Type should be Bracelet, Pendant or Ring!!!</strong>
                <form onSubmit={this.onSubmitHandler} className="formCreate">
                    <label>Name:</label>
                    <input
                        name="name"
                        placeholder="name"
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                    <label>Type:</label>
                    <input
                        name="type"
                        placeholder="type"
                        onChange={this.onChangeHandler}
                        label="Type"
                    />
                    <label>Gems:</label>
                    <input
                        name="gems"
                        placeholder="gems"
                        onChange={this.onChangeHandler}
                        label="Gems"
                    />
                    <label>ImageUrl:</label>
                    <input
                        name="imageUrl"
                        placeholder="imageUrl"
                        onChange={this.onChangeHandler}
                        label="ImageUrl"
                    />
                 
                    <input type="submit" value="Create" />
                </form>
            </div>
        );
    }
}

export default withRouter(CreateJewel);