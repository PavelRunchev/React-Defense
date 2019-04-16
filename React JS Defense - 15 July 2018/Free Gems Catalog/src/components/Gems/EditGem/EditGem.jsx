import React, { Component } from 'react';
import './EditGem.scss';
import { withRouter } from 'react-router-dom';
import RequestGems from '../../../utils/RequestGems';
import toastr from 'toastr';
import Loading from '../../Loading/Loading';

class EditGem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gem: {},
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

    async componentDidMount() {
        const gemId = this.props.match.params.id;
        if(gemId !== undefined) {
            try{
                const res = await RequestGems.getGemById(gemId);
                if(res.error) {
                    return toastr.error('Invalid Credential!You Login!');
                }

                this.setState({ gem: res, imageUrl: res.imageUrl });
            }catch(error) { console.log(error.message); }
        }
    }

    onChangeHandler(e) { this.setState({ [e.target.name]: e.target.value }); }

    async onSubmitHandler(e) {
        e.preventDefault();
        const { gem } = this.state;
        const id = this.state.gem._id;

        const name = this.state.name || gem.name;
        const imageUrl = this.state.imageUrl || gem.imageUrl;
        const color = this.state.color || gem.color;
        const weight = this.state.weight || gem.weight;
        const origin = this.state.origin || gem.origin;
        const type = this.state.type || gem.type;

        /*
        / Name verification
        */
        if(name === '' || name === undefined || name === null) {
            return toastr.warning('Name cannot must be empty!');
        }

        if(!name.match('^[A-Z][a-z]+$')) {
            return toastr.warning('Name must be started a capital leter and after contains only letters!');
        }

        /*
        / ImageUrl verification
        */
        if(imageUrl === '' || imageUrl === undefined || imageUrl === null) {
            return toastr.warning('ImageUrl cannot must be empty!');
        }

        if(!imageUrl.match('^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$')) {
            return toastr.warning('ImageUrl must be valid URL link!');
        }

        /*
        / Color verification
        */
        if(color === '' || color === undefined || color === null) {
            return toastr.warning('Color cannot must be empty!');
        }

        if(!color.match('^[A-Z][a-z]+$')) {
            return toastr.warning('Color must be started a capital leter and after contains only letters!');
        }

        /*
        / Weight verification
        */
        if(isNaN(Number(weight))) {
            return toastr.warning('Weight must be number!');
        }

        if(Number(weight) <= 0) {
            return toastr.warning('Weight must be positive number!');
        }

        /*
        / Origin verification
        */
        if(origin === '' || origin === undefined || origin === null) {
            return toastr.warning('Origin cannot must be empty!');
        }

        //Compre first letter is uppercase!
        if(origin[0] !== origin[0].toUpperCase()) {
            return toastr.warning('Countries start with a capital letter!');
        }

        if(!origin.match('^[A-Za-z ]+$')) {
            return toastr.warning('Origin must be contains only letters!');
        }

        /*
        / Type verification
        */
        if(type === '' || type === undefined || type === null) {
            return toastr.warning('Type cannot must be empty!');
        }

        if(!type.match('^[A-Z][a-z]+$')) {
            return toastr.warning('Type must be started a capital leter and after contains only letters!');
        }

        const editedGem = { name, imageUrl, color, weight, origin, type };
        try{
            const res = await RequestGems.editGem(id, editedGem);
            if(res.error) {
                return toastr.error('Invalid Credential!You Login!');
            }

            toastr.success('The gem is edited Successful!');
            this.props.history.push('/gems/allGems');
        }catch(error) { toastr.error(error.message); };
    }

    render () {
        const { gem, imageUrl } = this.state;
        return (
            <div className="container-fluid edit-gem">
                <h2>Edit Gem Section</h2>
                <h4>All fields should start with a capital letter!</h4>
                <h4>The field "Name" must be name of Gemstone - example (Ruby, Emerald, Diamond)!</h4>
                <h4>The field "Type" must be only Bracelet, Pendant or Ring!</h4>

                {imageUrl === '' ? <Loading /> :
                    <section className="inner-editGem">
                        <div className="image-view">
                            {
                                gem.imageUrl === '' ? <img src={gem.imageUrl} alt="gallery"/> : <img src={imageUrl} alt="gallery"/>
                            }
                        </div>
                        <div className="edit-form">
                            <h3>Edit Gem Form</h3>
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="row">
                                    <span>
                                        <label>Name</label>
                                        <input 
                                            type="text"
                                            name="name" 
                                            placeholder={gem.name}  
                                            onChange={this.onChangeHandler} 
                                            id="name"
                                        />
                                    </span>
                                    <span>
                                        <label>Color</label>
                                        <input 
                                            type="text"
                                            name="color"
                                            placeholder={gem.color} 
                                            onChange={this.onChangeHandler} 
                                            id="color"
                                        />
                                    </span>
                                </div>
                                <div className="row">
                                    <span>
                                        <label>ImageUrl</label>
                                        <input 
                                            type="text"
                                            name="imageUrl"
                                            placeholder={gem.imageUrl}
                                            onChange={this.onChangeHandler}
                                            id="imageUrl"
                                        />
                                    </span>
                                    <span>
                                        <label>Weight</label>
                                        <input 
                                            type="text"
                                            name="weight"
                                            placeholder={gem.weight}
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
                                            placeholder={gem.origin}
                                            onChange={this.onChangeHandler}
                                            id="origin"
                                        />
                                    </span>
                                    <span>
                                        <label>Type</label>
                                        <input 
                                            type="text"
                                            name="type"
                                            placeholder={gem.type} 
                                            onChange={this.onChangeHandler}
                                            id="type"
                                        />
                                    </span>
                                </div>
                                <div className="row">
                                    <button type="submit" className="edit-submit-gem">Edit Gem</button>
                                </div>
                            </form>
                        </div>
                    </section>
                }
            </div>
        );
    }
}

export default withRouter(EditGem);