import React, { Component } from 'react';
import './CreateJewel.scss';
import { withRouter } from 'react-router-dom';
import RequestJewels from '../../../utils/RequestJewels';
import toastr from 'toastr';

class CreateJewel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: '',
            gems: '',
            imageUrl: ''
        };

        this.onSubmitJewel = this.onSubmitJewel.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) { this.setState({ [e.target.name]: e.target.value }); }

    async onSubmitJewel(e) {
        e.preventDefault();
        const { name, type, gems, imageUrl } = this.state;

        /*
        / Name verification
        */
        if(name === '' || name === undefined || name === null) {
            return toastr.warning('Name cannot must be empty!');
        }

        if(!name.match('^[A-Za-z ]+$')) {
            return toastr.warning('Name must be contains only letters!');
        }
        //Compare first letter is uppercase!
        if(name[0] !== name[0].toUpperCase()) {
            return toastr.warning('First letter must be Capital!');
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

        /*
        / Gems verification
        */
        if(gems === '' || gems === undefined || gems === null) {
            return toastr.warning('Gems cannot must be empty!');
        }

        if(!gems.match('^[A-Za-z]+$')) {
            return toastr.warning('Gems must be contains only letters!');
        }
        //Compare first letter is uppercase!
        if(gems[0] !== gems[0].toUpperCase()) {
            return toastr.warning('First letter must be Capital!');
        }

        /*
        / ImageUrl verification
        */
        if(imageUrl === '' || imageUrl === undefined || imageUrl === null) {
            return toastr.warning('ImageUrl cannot be empty!');
        }

        if(!imageUrl.match('^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$')) {
            return toastr.warning('ImageUrl must be valid URL link!');
        }

        try {
            const newJewel = {name, type, gems, imageUrl };
            const res = await RequestJewels.createJewel(newJewel);
            if(res.error) {
                return toastr.error('Invalid Credential!You Login!');
            }
    
            toastr.success('The jewel is created successful!');
            this.props.history.push('/jewels/allJewels/listFromJewels');           
        }catch(error) { console.log(error.message); }     
    }

    render() {
        const { imageUrl } = this.state;

        return (
            <div className="container-fluid createJewel">
                <h2 className="text-center">Create Jewel Section</h2>
                <h4 className="text-center">All fields should start with a capital letter!</h4>
                <h4 className="text-center">The field "Name" must be name of gemstone only - (Amethyst, Diamond, Emerald, Ruby, Sopphire, Topaz)!</h4>
                <h4 className="text-center">The field "Type" must be only Bracelet, Pendant or Ring!</h4>
   
                <section className="inner-createJewel">
                    <div className="image-view">
                        {imageUrl === '' ? <h3 className="text-center">No Selected ImageUrl!</h3> : <img src={imageUrl} alt="gallery"/>}
                    </div>
                    <div className="create-form">
                        <h3>Create Jewel Form</h3>
                        <form onSubmit={this.onSubmitJewel}>
                            <div className="row">
                                <label>Name</label>
                                <input 
                                    type="text"
                                    name="name" 
                                    placeholder="name"  
                                    onChange={this.onChangeHandler} 
                                    id="name"
                                />
                            </div>
                            <div className="row">
                                <label>Image Url</label>
                                <input 
                                    type="text"
                                    name="imageUrl"
                                    placeholder="image Url"
                                    onChange={this.onChangeHandler}
                                    id="imageUrl"
                                />
                            </div>
                            <div className="row">
                                <label>Gems</label>
                                <input 
                                    type="text"
                                    name="gems"
                                    placeholder="gems"
                                    onChange={this.onChangeHandler}
                                    id="gems"
                                />
                            </div>
                            <div className="row">
                                <label>Type</label>
                                <input 
                                    type="text"
                                    name="type"
                                    placeholder="type" 
                                    onChange={this.onChangeHandler}
                                    id="type"
                                />
                            </div>
                           
                            <button type="submit" className="create-jewel">Create Jewel</button>
                            
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(CreateJewel);