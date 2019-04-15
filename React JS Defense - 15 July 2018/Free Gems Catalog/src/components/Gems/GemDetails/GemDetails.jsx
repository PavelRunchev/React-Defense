import React, { Component } from 'react';
import './GemDetails.scss';
import { withRouter } from 'react-router-dom';
import RequestGems from '../../../utils/RequestGems';
import RequestMyGems from '../../../utils/RequestMyGems';
import Loading from '../../Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from 'sweetalert';
import toastr from  'toastr';

class GemDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gem: {}
        };

        this.onDeleteGem = this.onDeleteGem.bind(this);
        this.onTakeGem = this.onTakeGem.bind(this);
    }

    async componentDidMount() {
        const gemId = this.props.match.params.id;

        if(gemId !== undefined) {
            try {
                const res = await RequestGems.detailsGem(gemId);

                if(res.error) {
                    return toastr.error(res.error);
                }
    
                this.setState({ gem: res });
            }catch(error) { console.log(error.message); };         
        }
    }

    async onDeleteGem(e) {
        e.preventDefault();
        const gemId = this.state.gem._id;

        const willDelete = await swal({
            title: 'Are you sure want to delete?',
            text: 'It will be deleted permanently from base?',
            icon: 'warning',
            dangerMode: true,
            showCancelButton: true,
        });
        if(willDelete) {
            if(gemId !== undefined) {
                try {
                    const res = await RequestGems.deleteGem(gemId);
                    if(res.error) {
                        return toastr.error(res.error);
                    }
    
                    toastr.success('The gem is deleted successful!');
                    swal({ title: 'The gem is deleted successful!', icon: 'success' });
                    this.props.history.push('/gems/allGems');                 
                }catch(error) { console.log(error.message); }               
            }
        };
    }

    async onTakeGem(e) {
        e.preventDefault();
        const { gem } = this.state;

        if(localStorage.getItem('username') === null) {
            return toastr.warning('To take it gem, you must be Sign In!');
        }

        if(gem._id === '' || gem._id === undefined 
        || gem.name === '' || gem.name === undefined
        || gem.imageUrl === '' || gem.imageUrl === undefined
        || gem.color === '' || gem.color === undefined
        || gem.weight === '' || gem.weight === undefined
        || gem.origin === '' || gem.origin === undefined
        || gem.set === '' || gem.set === undefined) {
            return toastr.warning('Cannot must be do this operation!');
        } 

        const currentGem = {
            owner: localStorage.getItem('username'),
            type: gem.type,
            gemsName: gem.name,
            color: gem.color,
            imageUrl: gem.imageUrl
        };

        const take = await swal({
            title: 'Are you sure want to take it?',
            text: 'Are you sure want to take in your private room?',
            icon: 'warning',
            dangerMode: true
        });

        if (take) {
            if(gem._id !== undefined) {
                try{
                    const res = await RequestMyGems.takeGem(currentGem);

                    if(res.error) {
                        return toastr.error('Invalid Credential!You Login!');
                    }
                    swal({
                        title: 'The gem is taked successful!',
                        icon: 'success',
                        successMode: true
                    });
                    toastr.success('The gem is taked Successful!');
                    this.props.history.push('/myRoom/privateRoomSection');
                }catch(error) { toastr.error(error.message); }
            }
        }
    }

    render () {
        const { gem } = this.state;
        return (
            <div className="container-fluid details-gem">
                <h2>Details Gem Section</h2>

                {this.state.gem.imageUrl === undefined ? <Loading /> : 
                    <div className="inner-details">
                       
                        <div className="image-name">
                            <h4>Name: {gem.name}</h4>
                            <img  src={gem.imageUrl} alt="gallery"/>
                        </div>
                        <div className="info">
                            <button onClick={this.onDeleteGem}>
                                <FontAwesomeIcon icon="trash-alt" size="2x" className="trash"></FontAwesomeIcon>
                            </button>
                            <h4>Info for Gem</h4>
                            <div className="inner-text">
                                <p>Color: {gem.color}</p>
                                <p>Weight: {gem.weight} ct.</p>
                                <p>Origin: {gem.origin}</p>
                                <p>Set: {gem.type}</p>
                            </div>
                             
                            <span>
                                <FontAwesomeIcon icon="hand-point-right" className="right-hand"/>
                                <button className="take-it" onClick={this.onTakeGem}>Take It</button>
                            </span>  
                            <div className="info-take font-weight-bold">Clicked button and take current gem in your room!</div>                         
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(GemDetails);