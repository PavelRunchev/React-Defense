import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import './MyDetailsJewel.css';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';

class DetailsMyJewel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jewel: {}
        }

        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        toastr.info("Loading ...");
        let jewelId = this.props.match.params.id;
        if(jewelId !== undefined) {
            ReqHandler.detailsMyJewel(jewelId)
                .then(detailJewel => {
                    this.setState({jewel: detailJewel});

                    console.log(this.state.jewel);
                });
        }
    }

    onClick(e) {
        e.preventDefault();
        let jewelId = this.state.jewel._id;
        ReqHandler.deleteMyJewel(jewelId).then(() => {
            toastr.success('jewel is destroyed!');
            this.props.history.push('/myStore');
        });
    }

    render () {
        if(this.state.jewel === undefined) {
            return (
                <div className="detailsLoading">
                    <h1>Loading ...</h1>
                </div>
            )
        }
        return (
            <div className="detailsJewel">
                <div className="detailsJ"> 
                    <h1>Name: {this.state.jewel.name}</h1>
                    <p><strong>Type:</strong> {this.state.jewel.type}</p>
                    <p><strong>Gems:</strong> {this.state.jewel.gems}</p>
                    <p><strong>Owner:</strong> {this.state.jewel.owner}</p>
                    <p><strong>Raiting:</strong> {this.state.jewel.raiting}</p>
                    <img className="image" src={this.state.jewel.imageUrl} alt="jewel" width="250" height="250"/>
                    <div className="controls">
                        <button onClick={this.onClick}>Destroy</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(DetailsMyJewel);