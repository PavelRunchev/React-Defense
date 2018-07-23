import React, { Component } from 'react';
import './ListGems.css';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';
import { withRouter } from 'react-router-dom';
import Gem from './Gem';

class ListGems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gems: [],
            name: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        toastr.info("Loding ...");
        ReqHandler.allGems().then(allGems => {
            allGems.map((p, i) => p.index = i + 1)
            this.setState({gems: allGems});
        }).catch(err => console.log(err.message));
    }

    onSubmit(e) {
        e.preventDefault();
        toastr.info("Loding ...");
        let gemName = this.state.name;
        let gemsArr = this.state.gems;
        let gemsSearched = gemsArr.filter(g => g.name === gemName);
  
        this.setState({gems: gemsSearched});
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render () {
        return (
            <div className="listGems">
                <h1>List of Gems</h1>
                <form onSubmit={this.onSubmit}>
                    <label>Search: </label>
                    <input name="name" placeholder="name of gem" onChange={this.onChange}/>
                    <input type="submit" value="Search" className="search" />
                </form>
                <div className="gems">
                    {this.state.gems.length === 0 ?
                    <h1>Loading &hellip;</h1> : 
                    this.state.gems.map(g => {
                        return <Gem key={g._id} props={g}/>
                    })}
                 
                </div>               
            </div>
        )
    }
}

export default withRouter(ListGems);