import React, { Component } from 'react';
import './EditJewel.scss';
import { withRouter } from 'react-router-dom';
import EditJewelLoader from '../../HOC/EditJewelLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class EditJewelBase extends Component {
    render () {
        const jewel = this.props.data;
        return (
            <div className="container-fluid editJewel-form">
                <h2 className="text-center">Edit Jewel Section</h2>
                <h4 className="text-center">All fields should start with a capital letter!</h4>
                <h4 className="text-center">The field "Name" must be name of gemstone only - (Amethyst, Diamond, Emerald, Ruby, Sapphire, Topaz)!</h4>
                <h4 className="text-center">The field "Type" must be only Bracelet, Pendant or Ring!</h4>
                
                <section className="inner-editJewel">
                    <div className="image-view">
                        {jewel.imageUrl === '' ? <h3 className="text-center">No Selected ImageUrl!</h3> 
                            : <img src={jewel.imageUrl} alt=""/>
                        }
                    </div>
                    <div className="edit-form">
                            
                        <button onClick={this.onDeleteJewel}>
                            <FontAwesomeIcon icon="trash-alt" size="2x" className="trash"></FontAwesomeIcon>
                        </button>
                            
                        <h3>Edit Form</h3>
                        <form onSubmit={this.props.handler[1]}>
                            <div className="row">
                                <label>Name</label>
                                <input 
                                    type="text"
                                    name="name" 
                                    placeholder={jewel.name}  
                                    onChange={this.props.handler[0]} 
                                    id="name"
                                />
                            </div>
                            <div className="row">
                                <label>ImageUrl</label>
                                <input 
                                    type="text"
                                    name="imageUrl"
                                    placeholder={jewel.imageUrl}
                                    onChange={this.props.handler[0]}
                                    id="imageUrl"
                                />
                            </div>
                            <div className="row">
                                <label>Gems</label>
                                <input 
                                    type="text"
                                    name="gems"
                                    placeholder={jewel.gems}
                                    onChange={this.props.handler[0]}
                                    id="gems"
                                />
                            </div>
                            <div className="row">
                                <label>Type</label>
                                <input 
                                    type="text"
                                    name="type"
                                    placeholder={jewel.type} 
                                    onChange={this.props.handler[0]}
                                    id="type"
                                />
                            </div>
                           
                            <button type="submit" className="edit-jewel">Edit</button>
                        </form>
                    </div>
                </section>
            </div>
        );      
    }   
}

const EditJewel = EditJewelLoader(EditJewelBase);

export default withRouter(EditJewel);