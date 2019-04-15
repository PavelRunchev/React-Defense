import React, { Component } from 'react';
import './CreateGem.scss';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';
import RequestGems from '../../../utils/RequestGems';

class CreateGem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            color: '',
            weight: 0,
            origin: '',
            type: ''
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) { this.setState({ [e.target.name]: e.target.value }); }

    async onSubmitHandler(e) {
        e.preventDefault();
        const { name, imageUrl, color, weight, origin, type } = this.state;

        /*
        / Name verification
        */
        if(name === '') {
            return toastr.warning('Name cannot must be empty!');
        }

        if(!name.match('^[A-Za-z]+$')) {
            return toastr.warning('Name must be contains only letters!');
        }
        //Compre first letter is uppercase!
        if(name[0] !== name[0].toUpperCase()) {
            return toastr.warning('First letter must be Capital!');
        }

        /*
        / ImageUrl verification
        */
        if(imageUrl === '') {
            return toastr.warning('ImageUrl cannot must be empty!');
        }

        if(!imageUrl.match('^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$')) {
            return toastr.warning('ImageUrl must be valid URL link!');
        }

        /*
        / Color verification
        */
        if(color === '') {
            return toastr.warning('Color cannot must be empty!');
        }

        if(!color.match('^[A-Za-z]+$')) {
            return toastr.warning('Color must be only lowercase!');
        }

        /*
        / Weight verification
        */
        if(Number(weight) <= 0) {
            return toastr.warning('Weight must be positive number!');
        }

        /*
        / Origin verification
        */
        if(origin === '' || origin === undefined || origin === null) {
            return toastr.warning('Origin cannot must be empty!');
        }

        if(!origin.match('^[A-Za-z ]+$')) {
            return toastr.warning('Origin must be contains only letters!');
        }
        //Compare first letter is uppercase!
        if(origin[0] !== origin[0].toUpperCase()) {
            return toastr.warning('Countries start with a capital letter!');
        }

        /*
        / Type verification
        */
        if(type === '' || type === undefined || type === null) {
            return toastr.warning('Type cannot must be empty!');
        }

        if(!type.match('^[A-Za-z]+$')) {
            return toastr.warning('Type must be contains only letters!');
        }

        //Compare first letter is uppercase!
        if(type[0] !== type[0].toUpperCase()) {
            return toastr.warning('Type start with a capital letter!');
        }

        const newGem = { name, imageUrl, color, weight, origin, type };

        try{
            const res = await RequestGems.createGem(newGem);
            if(res.error) {
                return toastr.error('Invalid Credential!You Login!');
            }
            toastr.success('The gem is created Successful!');
            this.props.history.push('/gems/allGems');
        }catch(error) { console.log(error.message); }
    }

    render () {
        const { imageUrl } = this.state;
        return (
            <div className="container-fluid create-gem">
                <h2>Create Gem Section</h2>
                <h4>All fields should start with a capital letter!</h4>
                <h4>The field "Name" must be name of gemstone only - (Amethyst, Diamond, Emerald, Ruby, Sopphire, Topaz)!</h4>
                <h4>The field "Type" must be only Bracelet, Pendant or Ring!</h4>

                <section className="inner-create">
                    <div className="image-view">
                        {
                            imageUrl === '' ? <h3 className="text-center">No Selected ImageUrl!</h3> : <img src={imageUrl}  alt="view"/>
                        }
                    </div>
                    <div className="create-form">
                        <h3>Create Gem Form</h3>
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="row">
                                <span>
                                    <label>Name</label>
                                    <input 
                                        type="text"
                                        name="name" 
                                        placeholder="name"  
                                        onChange={this.onChangeHandler} 
                                        id="name"
                                    />
                                </span>
                                <span>
                                    <label>Color</label>
                                    <input 
                                        type="text"
                                        name="color"
                                        placeholder="color" 
                                        onChange={this.onChangeHandler} 
                                        id="color"
                                    />
                                </span>
                            </div>
                            <div className="row">
                                <span>
                                    <label>Image Url</label>
                                    <input 
                                        type="text"
                                        name="imageUrl"
                                        placeholder="imageUrl"
                                        onChange={this.onChangeHandler}
                                        id="imageUrl"
                                    />
                                </span>
                                <span>
                                    <label>Weight</label>
                                    <input 
                                        type="text"
                                        name="weight"
                                        placeholder="weight"
                                        onChange={this.onChangeHandler}
                                        id="weight"
                                    />
                                </span>
                            </div>
                            <div className="row">
                                <span>
                                    <label>Origin</label>
                                    <input 
                                        type="text"
                                        name="origin"
                                        placeholder="origin"
                                        onChange={this.onChangeHandler}
                                        id="origin"
                                    />
                                </span>
                                <span>
                                    <label>Type</label>
                                    <input 
                                        type="text"
                                        name="type"
                                        placeholder="type" 
                                        onChange={this.onChangeHandler}
                                        id="type"
                                    />
                                </span>
                            </div>
                            <div className="row">
                                <button type="submit" className="create-submit-gem">Create Gem</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(CreateGem);