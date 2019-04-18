import React, { Component } from 'react';
import './EditPublicJewel.scss';
import { withRouter } from 'react-router-dom';
import EditJewelLoader from '../../HOC/EditJewelLoader';

class EditPublicJewelBase extends Component {

    render() {
        const jewel = this.props.data;

        return(
            <div className="container-fluid edit-publicJewel">
                <h2>Edit Public Jewel Section</h2>
                <h4 className="text-center">All fields should start with a capital letter!</h4>
                <h4 className="text-center">The field "Name" must be name of gemstone only - (Amethyst, Diamond, Emerald, Ruby, Sapphire, Topaz)!</h4>
                <h4 className="text-center">The field "Type" must be only Bracelet, Pendant or Ring!</h4>

                <section className="inner-edit-publicJewel">
                    <div className="image-view">
                        {
                            jewel.imageUrl === '' ? <h3 className="text-center">No Selected ImageUrl!</h3> : <img src={jewel.imageUrl} alt=""/>
                        }
                    </div>
                    <div className="edit-publicJewel-form">
                        <h3>Edit Form</h3>
                        <form onSubmit={this.props.handler[1]}>
                            <div className="row">
                                <span>
                                    <label>Name</label>
                                    <input 
                                        type="text"
                                        name="name" 
                                        placeholder={jewel.name}  
                                        onChange={this.props.handler[0]} 
                                        id="name"
                                    />
                                </span>
                                <span>
                                    <label>Owner</label>
                                    <input 
                                        type="text"
                                        name="owner"
                                        placeholder={jewel.owner} 
                                        onChange={this.props.handler[0]} 
                                        id="owner"
                                    />
                                </span>
                            </div>
                            <div className="row">
                                <span>
                                    <label>ImageUrl</label>
                                    <input 
                                        type="text"
                                        name="imageUrl"
                                        placeholder={jewel.imageUrl}
                                        onChange={this.props.handler[0]}
                                        id="imageUrl"
                                    />
                                </span>
                                <span>
                                    <label>Rating</label>
                                    <input 
                                        type="text"
                                        name="rating"
                                        placeholder={jewel.raiting}
                                        onChange={this.props.handler[0]}
                                        id="rating"
                                    />
                                </span>
                            </div>
                            <div className="row">
                                <span>
                                    <label>Gems</label>
                                    <input 
                                        type="text"
                                        name="gems"
                                        placeholder={jewel.gems}
                                        onChange={this.props.handler[0]}
                                        id="gems"
                                    />
                                </span>
                                <span>
                                    <label>Type</label>
                                    <input 
                                        type="text"
                                        name="type"
                                        placeholder={jewel.type} 
                                        onChange={this.props.handler[0]}
                                        id="type"
                                    />
                                </span>
                            </div>
                            <div className="row">
                                <button type="submit" className="edit-submit-jewel">Edit</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

const EditPublicJewel = EditJewelLoader(EditPublicJewelBase);

export default withRouter(EditPublicJewel);