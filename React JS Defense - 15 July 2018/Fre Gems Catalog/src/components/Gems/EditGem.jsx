import React, { Component } from 'react';
import './EditGem.css';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';
import ReqHandler from '../../utils/ReqHandler';

class EditGem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            color: '',
            imageUrl: '',
            weight: '',
            origin: '',
            type: '',
            gem: {}
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        ReqHandler.detailsGem(this.props.match.params.id).then(curGem => {
            this.setState({gem: curGem});
        })
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        let gemId = this.props.match.params.id;
        let name = this.state.name || this.state.gem.name;
        let color = this.state.color || this.state.gem.color;
        let weight = Number(this.state.weight) || Number(this.state.gem.weight);
        let imageUrl = this.state.imageUrl || this.state.gem.imageUrl;
        let origin = this.state.origin || this.state.gem.origin;
        let type = this.state.type || this.state.gem.type;

        if(name === '' || color === '' || imageUrl === '' || origin === '' || type === '' || weight < 0) {
            toastr.warning("Fields cannot be empty to create Gem!");
            return;
        }

        let editGem = {
            name,
            color,
            weight,
            imageUrl,
            origin,
            type
        };

        ReqHandler.editGem(gemId, editGem).then(gemEdited => {
            console.log(gemEdited);
            toastr.success("edit gem successful");
            this.props.history.push('/listGems');
        });
    }

    render() {
        return (
            <div className="editGem">
                <h1>Edit Gem</h1>
                <strong>just filled in the current field you want to edit!</strong>
                <div className="border">
                    <form onSubmit={this.onSubmitHandler} className="formEdit">
                        <label>Name:</label>
                        <input
                            name="name"
                            placeholder={this.state.gem.name}
                            onChange={this.onChangeHandler}
                            label="Name"
                        />
                        <label>Color:</label>
                        <input
                            width="200px"
                            name="color"
                            placeholder={this.state.gem.color}
                            onChange={this.onChangeHandler}
                            label="Color"
                        />
                        <label>Weight:</label>
                        <input
                            name="weight"
                            type="number"
                            placeholder={this.state.gem.weight}
                            onChange={this.onChangeHandler}
                            label="weight"
                        />
                        <label>ImageUrl:</label>
                        <input
                            name="imageUrl"
                            placeholder={this.state.gem.imageUrl}
                            onChange={this.onChangeHandler}
                            label="ImageUrl"
                        />
                        <label>Origin:</label>
                        <input
                            name="origin"
                            placeholder={this.state.gem.origin}
                            onChange={this.onChangeHandler}
                            label="Origin"
                        />
                        <label>Type:</label>
                        <input
                            name="type"
                            placeholder={this.state.gem.type}
                            onChange={this.onChangeHandler}
                            label="Type"
                        />
                    
                        <input type="submit" value="Edit" className="submitEdit"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(EditGem);