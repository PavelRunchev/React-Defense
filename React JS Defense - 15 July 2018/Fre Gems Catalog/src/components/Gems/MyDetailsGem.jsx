import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import './MyDetailsGem.css';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';

class MyDetailsGem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gem: {}
        }

        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        let gemId = this.props.match.params.id;
        if(gemId !== undefined) {
            ReqHandler.myDetailsGem(gemId).then(currentGem => {
                this.setState({gem: currentGem});
                console.log(this.state.gem);
            }).catch(() => toastr.error("There is no such Gem!"));
        }
    }

    onClick(e) {
        e.preventDefault();
        let id = this.props.match.params.id;
        if(id !== undefined) {
            ReqHandler.deleteMyGems(id).then(() => {
                toastr.success('gem destroyed successful')
                this.props.history.push('/myStore');
            });
        }
    }

    render () {

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
                    <h1>{this.state.gem.gemsName}</h1>
                    <p><strong>Owner:</strong> {this.state.gem.owner}</p>
                    <p><strong>Color:</strong> {this.state.gem.color}</p>
                    <p><strong>for upgrade:</strong> {this.state.gem.type}</p>    
                    <img className="image" src={this.state.gem.imageUrl} alt="gem" width="350" height="350"/>
                    <div className="controls">
                        <button onClick={this.onClick}>Destroy</button>     
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MyDetailsGem);