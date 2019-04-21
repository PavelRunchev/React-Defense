import React, { Component } from 'react';
import './MyGemDetails.scss';
import { withRouter } from 'react-router-dom';
import RequestMyGems from '../../../utils/RequestMyGems';
import Loading from '../../Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toastr from 'toastr';
import swal from 'sweetalert';

class MyGemDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myGem: {}
        };

        this.onDeleteMyGem = this.onDeleteMyGem.bind(this);
    }

    async componentDidMount() {
        const gemId = this.props.match.params.id;
        if(gemId !== undefined) {
            const myGem = await RequestMyGems.getMyGemById(gemId);
            if(myGem.error) {
                return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
            }

            this.setState({ myGem });
        }
    }

    async onDeleteMyGem(e) {
        e.preventDefault();
        const gemId = this.state.myGem._id;

        if(gemId !== undefined) {
            const willDelete = await swal({
                title: 'Are you sure want to delete the Gem?',
                text: 'It will be deleted permanently from base?',
                icon: 'warning',
                dangerMode: true,
                showCancelButton: true,
            });
            if (willDelete) {
                try {
                    const res = await RequestMyGems.removeMyGem(gemId);
                    if(res.error) {
                        return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
                    }

                    toastr.success('Your gem is deleted successful!');
                    swal({ title: 'Your gem is deleted successful!', icon: 'success' });
                    this.props.history.push('/myRoom/privateRoomSection');
                }catch(error) { console.log(error.message); }
            }                   
        }
    }

    render () {
        const { myGem } = this.state;
        return (
            <div className="container-fluid details-myGem">
                <h2>Details Your Gem Section</h2>
                { myGem === undefined ? <Loading/> : 
                    <div className="inner-myDetailsGem">
                        <button onClick={this.onDeleteMyGem} className="myGem-remove">
                            <FontAwesomeIcon icon="trash-alt" className="trash"></FontAwesomeIcon>
                        </button>
                        <div className="myGem-form">
                            <div className="picture-gem">
                                <img src={myGem.imageUrl} alt="gallery" />
                            </div>

                            <div className="myGem-info">
                                <h3 className="font-weight-bold">Info for your Gem</h3>
                                <div className="text">
                                    <p>Owner:<span> {myGem.owner}</span> </p>
                                    <p>Name:<span> {myGem.gemsName}</span> </p>
                                    <p>Set:<span> {myGem.type}</span> </p>
                                    <p>Color:<span> {myGem.color}</span> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(MyGemDetails);