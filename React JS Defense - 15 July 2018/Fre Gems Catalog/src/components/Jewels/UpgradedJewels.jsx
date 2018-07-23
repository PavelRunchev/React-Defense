import React, { Component } from 'react';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';
import './UpgradedJewels.css';
import { withRouter } from 'react-router-dom';
import Jewel from './Jewel';

class UpgradedJewels extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allJewels: [],
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        ReqHandler.allUpgradeJewels().then(jewels => {
            jewels.map((p, i) => { return p.index = i + 1});
            jewels.sort((a, b) => b.raiting - a.raiting);
            this.setState({allJewels: jewels});
        }).catch(err => console.log(err.message));
    }

    onSubmit(e) {
        e.preventDefault();
        toastr.info("Loding ...");
        let jewelName = this.state.name;
        let jewelsArr = this.state.allJewels;
        let jewelsSearched = jewelsArr.filter(j => j.name === jewelName);
        this.setState({allJewels: []});
        console.log(this.state.allJewels);
        this.setState({allJewels: jewelsSearched});

        console.log(this.state.allJewels);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render () {
        return (
            <div className="listJewels">
                <h1>List of Jewels</h1>
                <p>This is all upgrads gems to jewels on all registered users!</p>
                <form onSubmit={this.onSubmit}>
                    <label>Search: </label>
                    <input name="name" placeholder="name of jewel" onChange={this.onChange}/>
                    <input type="submit" value="Search" className="search" />
                </form>
                <div className="jewels">
                    {this.state.allJewels.length === 0 ?
                    <h1>Loading &hellip;</h1> : 
                    this.state.allJewels.map(j => {
                        return <Jewel key={j._id} props={j}/>
                    })}
                 
                </div>               
            </div>
        )
    }
}

export default withRouter(UpgradedJewels);