import React, { Component } from 'react';
import './EditJewel.scss';
import { withRouter } from 'react-router-dom';
import RequestJewels from '../../../utils/RequestJewels';
import Loading from '../../Loading/Loading';
import toastr from 'toastr';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class EditJewel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jewel: undefined,
            name: '',
            type: '',
            gems: '',
            imageUrl: ''
        };

        this.onEditJewel = this.onEditJewel.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onDeleteJewel = this.onDeleteJewel.bind(this);
    }

    async componentDidMount() {
        const jewelId = this.props.match.params.id;
        if(jewelId !== undefined) {
            const jewel = await RequestJewels.getJewelById(jewelId);

            if(jewel.error) {
                return toastr.error('Invalid Credential!You Login!');
            }

            this.setState({ jewel, imageUrl: jewel.imageUrl });
        }
    }

    onChangeHandler(e) {  this.setState({ [e.target.name]: e.target.value }); }

    async onDeleteJewel(e) {
        e.preventDefault();

        const willDelete =  await swal({
            title: 'Are you sure want to delete?',
            text: 'It will be deleted permanently from base?',
            icon: 'warning',
            dangerMode: true,
            showCancelButton: true,
        });
        if (willDelete) {
            const jewelId = this.state.jewel._id;

            if(jewelId !== undefined) {
                try {
                    const res = await RequestJewels.removeJewel(jewelId);
                    if(res.error) {
                        return toastr.error('Invalid Credential!You Login!');
                    }
                    toastr.success('The jewel is deleted successful!');
                    swal({ title: 'The jewel is deleted successful!', icon: 'success' });
                    this.props.history.push('/jewels/allJewels/listFromJewels');
                }catch(error) { toastr.error(error.message); };
            }
        }
    }

    async onEditJewel(e) {
        e.preventDefault();
        const { jewel } = this.state;
        const jewelId = jewel._id;
        const name = this.state.name || jewel.name;
        const gems = this.state.gems || jewel.gems;
        const type = this.state.type || jewel.type;
        const imageUrl = this.state.imageUrl || jewel.imageUrl;

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

        const editJewel = { name, gems, type, imageUrl };
        if(jewelId !== undefined) {
            try{
                const res = await RequestJewels.editJewel(jewelId, editJewel);
                if(res.error) {
                    return toastr.error('Invalid Credential!You Login!');
                }

                toastr.success('The jewel is edited Successful!');
                this.props.history.push('/jewels/allJewels/listFromJewels');
            }catch(error) { console.log(error.message); }
        }        
    }

    render () {
        const { jewel, imageUrl } = this.state;
        return (
            <div className="container-fluid editJewel-form">
                <h2 className="text-center">Edit Jewel Section</h2>
                <h4 className="text-center">All fields should start with a capital letter!</h4>
                <h4 className="text-center">The field "Name" must be name of gemstone only - (Amethyst, Diamond, Emerald, Ruby, Sapphire, Topaz)!</h4>
                <h4 className="text-center">The field "Type" must be only Bracelet, Pendant or Ring!</h4>
                
                {jewel === undefined ? <Loading/> : 
                    <section className="inner-editJewel">
                        <div className="image-view">
                            {imageUrl === '' ? <h3 className="text-center">No Selected ImageUrl!</h3> 
                                : <img src={imageUrl} alt=""/>
                            }
                        </div>
                        <div className="edit-form">
                            
                            <button onClick={this.onDeleteJewel}>
                                <FontAwesomeIcon icon="trash-alt" size="2x" className="trash"></FontAwesomeIcon>
                            </button>
                            
                            <h3>Edit Jewel Form</h3>
                            <form onSubmit={this.onEditJewel}>
                                <div className="row">
                                    <label>Name</label>
                                    <input 
                                        type="text"
                                        name="name" 
                                        placeholder={jewel.name}  
                                        onChange={this.onChangeHandler} 
                                        id="name"
                                    />
                                </div>
                                <div className="row">
                                    <label>ImageUrl</label>
                                    <input 
                                        type="text"
                                        name="imageUrl"
                                        placeholder={jewel.imageUrl}
                                        onChange={this.onChangeHandler}
                                        id="imageUrl"
                                    />
                                </div>
                                <div className="row">
                                    <label>Gems</label>
                                    <input 
                                        type="text"
                                        name="gems"
                                        placeholder={jewel.gems}
                                        onChange={this.onChangeHandler}
                                        id="gems"
                                    />
                                </div>
                                <div className="row">
                                    <label>Type</label>
                                    <input 
                                        type="text"
                                        name="type"
                                        placeholder={jewel.type} 
                                        onChange={this.onChangeHandler}
                                        id="type"
                                    />
                                </div>
                           
                                <button type="submit" className="edit-jewel">Edit Jewel</button>
                            </form>
                        </div>
                    </section>
                }
            </div>
        );      
    }   
}

export default withRouter(EditJewel);