import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './DetailsGem.css';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';

class DetailsGem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gem: {}
        }

        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        toastr.info("Loading ...");
        let gemId = this.props.match.params.id;
        if(gemId !== undefined) {
            ReqHandler.detailsGem(gemId).then(currentGem => {
                this.setState({gem: currentGem});
            }).catch(() => toastr.error("There is no such Gem!"));
        }
    }

    onClick(e) {
        e.preventDefault();
        let owner = localStorage.getItem('username');
        let type = this.state.gem.type;
        let gemsName = this.state.gem.name;
        let color = this.state.gem.color;
        let imageUrl = this.state.gem.imageUrl;

        let gemStored = {
            owner,
            type,
            gemsName,
            color,
            imageUrl
        }
        
        ReqHandler.takeGem(gemStored).then(myGem => {
            toastr.success('Take it the gem.');
            this.props.history.push('/myStore');
        }).catch(err => console.log(err.message));
    }

    render () {
        const isAdmin = localStorage.getItem('isAdmin') !== null;

        if(this.state.gem === undefined) {
            return (
                <div className="detailsLoading">
                    <h1>Loading ...</h1>
                </div>
            )
        }
        return (
            <div className="detailsGem">
                <div className="details"> 
                    <h1>{this.state.gem.name}</h1>
                    <p><strong>Color: </strong> {this.state.gem.color}</p>
                    <p><strong>Weight: </strong> {this.state.gem.weight} ct.</p>
                    <p><strong>Origin: </strong> {this.state.gem.origin}</p>
                    <p><strong>Set: </strong> {this.state.gem.type}</p>    
                    <img className="image" src={this.state.gem.imageUrl} alt="gem" width="650" height="650"/>
                    <div className="controls">
                        <button onClick={this.onClick}>Take it</button>
                        {isAdmin && <Link to={`/editGem/${this.state.gem._id}`}>  Edit  </Link>}
                        {isAdmin && <Link to={`/deleteGem/${this.state.gem._id}`}>Delete</Link>}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(DetailsGem);