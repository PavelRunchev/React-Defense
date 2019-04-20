import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './MyJewelDetails.scss';
import RequestMyJewels from '../../../utils/RequestMyJewels';
import swal from 'sweetalert';
import toastr from 'toastr';
import Loading from '../../Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MyJewelDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myJewel: {},
            noMyJewel: true
        };

        this.onDeleteMyJewel = this.onDeleteMyJewel.bind(this);
    }

    async componentDidMount() {
        const jewelId = this.props.match.params.id;
        if(jewelId !== undefined) {
            const myJewel = await RequestMyJewels.getMyJewelById(jewelId);
            if(myJewel.error) {
                return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
            }

            this.setState({ myJewel, noMyJewel: false });
        }
    }

    async onDeleteMyJewel(e) {
        e.preventDefault();
        const jewelId = this.state.myJewel._id;

        if(jewelId !== undefined) {
            const willDelete = await swal({
                title: 'Are you sure want to delete the Jewel?',
                text: 'It will be deleted permanently from base?',
                icon: 'warning',
                dangerMode: true,
                showCancelButton: true,
            });
            if (willDelete) {
                try {
                    const res = await RequestMyJewels.removeMyJewel(jewelId);
                    if(res.error) {
                        return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
                    }

                    toastr.success('Your jewel is deleted successful!');
                    swal({ title: 'Your jewel is deleted successful!', icon: 'success' });
                    this.props.history.push('/myRoom/privateRoomSection');
                }catch(error) { console.log(error.message); }
            }                   
        }
    }

    render() {
        const { myJewel, noMyJewel } = this.state;
        return (
            <div className="container-fluid myJewel-details">
                <h2 className="h2 text-center">Your Jewel</h2>

                {noMyJewel ? <Loading/> : 
                    <div className="inner-myJewel-details">
                        <button onClick={this.onDeleteMyJewel} className="myJewel-remove">
                            <FontAwesomeIcon icon="trash-alt" className="trash"></FontAwesomeIcon>
                        </button>

                        <div className="myJewel-form">
                            <div className="picture-jewel">
                                <img src={myJewel.imageUrl} alt="gallery" />
                            </div>

                            <div className="myJewel-info">
                                <h3 className="font-weight-bold">Info for your Jewel</h3>
                                <div className="text">
                                    <p>Owner:<span> {myJewel.owner}</span> </p>
                                    <p>Name:<span> {myJewel.name}</span> </p>
                                    <p>Set:<span> {myJewel.type}</span> </p>
                                    <p>Created from:<span> {myJewel.gems}</span> </p>
                                    <p>Rating:<span> {myJewel.raiting}</span> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(MyJewelDetails);