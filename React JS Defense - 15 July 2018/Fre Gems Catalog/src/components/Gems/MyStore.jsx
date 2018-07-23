import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReqHandler from '../../utils/ReqHandler';
import './MyStore.css';
import MyGemView from './MyGemView';
import MyJewelView from '../Jewels/MyJewelView';
import toastr from 'toastr';

class MyStore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gems: [],
            jewels: [],
            select: 'Pendant',
            jewel: '',
            noUpdate: false,
            selectUpgrade: 'Ruby'
        }

        this.onClickJewels = this.onClickJewels.bind(this);
        this.onClickGems = this.onClickGems.bind(this);
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUpgrade = this.onChangeUpgrade.bind(this);
        this.onSubmitUpgrade = this.onSubmitUpgrade.bind(this);
    }

    componentDidMount() {
        if(!localStorage.getItem('authtoken')){
            return this.props.history.push('/');
        }
    }

    onClickGems(e) {
        e.preventDefault();
        let searchType = this.state.select;
        let user = localStorage.getItem('username');
        ReqHandler.myGems(user)
            .then(myGems => {
                let filtredGems = myGems.filter(g => g.type === searchType);
                this.setState({gems: filtredGems})
                this.setState({jewels: []});
            }).catch(err => console.log(err.message));
    }

    onClickJewels(e) {
        e.preventDefault();
        ReqHandler.myJewels(localStorage.getItem('username')).then(myJewels => {
            this.setState({jewels: myJewels});
            this.setState({gems: []});
        })
    }

    onSubmit(e) {
        e.preventDefault();
        let searchType = this.state.select;
        let user = localStorage.getItem('username');
        ReqHandler.myGems(user)
            .then(myGems => {
                let filtredGems = myGems.filter(g => g.type === searchType);
                this.setState({gems: filtredGems})
                this.setState({jewels: []});
            }).catch(err => console.log(err.message));
    }

    onSubmitUpgrade(e) {
        e.preventDefault();
        let arrGems = this.state.gems;
        let name = this.state.selectUpgrade;
        let filteredGamsByName = arrGems.filter(g => g.gemsName === name);

        ReqHandler.myJewels(localStorage.getItem('username')).then(myJewels => {
            ReqHandler.getJewelCurrentType(this.state.select).then(jewelsForUpgrade => {
                let upgradeJewel = jewelsForUpgrade.filter(j => j.gems === name);
          
                for (let jwl of myJewels) {
                    if(jwl.name === upgradeJewel[0].name) {
                        this.setState({noUpdate: true});
                        return;
                    }
                }
                
                let upgradeToJewel = {
                    owner: localStorage.getItem('username'),
                    name: upgradeJewel[0].name,
                    gems: upgradeJewel[0].gems,
                    imageUrl: upgradeJewel[0].imageUrl,
                    type: upgradeJewel[0].type,
                    raiting: 0
                }
            
                console.log(upgradeToJewel);
                ReqHandler.upgradeGemsToJewel(upgradeToJewel).then(jewelry => {
                    toastr.success('upgrade gems to Jewel successful');
                    this.props.history.push(`/myDetailsJewel/${jewelry._id}`);
                    for (let i = 0; i < 3; i++) {
                        ReqHandler.deleteMyGems(filteredGamsByName[i]._id).then();
                    }
                });
            });
        });
    }

    onChange (event) {
        this.setState({[event.target.name]: event.target.value});
        this.setState({gem: []});
    }

    onChangeUpgrade(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        if(this.state.noUpdate) {
            return (
                <div className="myStore">
                    <h1>My Store</h1>
                    <strong>Select button Gems or Jewels!</strong>
                    <div className="gems">
                        <select onChange={this.onChange} name="select" value={this.state.select}>
                            <option value="Pendant">Pendant</option>
                            <option value="Bracelet">Bracelet</option>
                            <option value="Ring">Ringt</option>
                        </select>
                        <button onClick={this.onClickGems}>Gems</button>
                    </div>
                    <div className="jewels">
                        <button onClick={this.onClickJewels}>Jewels</button>
                    </div>

                    <h1>Cannot Upgrade Gems, You have this Jewel!</h1>              
                </div>
            )
        }
        if(this.state.jewels.length !== 0) {
            return (
                <div className="myStore">
                    <h1>My Store</h1>
                    <strong>Select button Gems or Jewels!</strong>
                    <div className="gems">
                        
                        <form onSubmit={this.onSubmit}>
                            <select onChange={this.onChange} name="select" value={this.state.select}>
                                <option value="Pendant">Pendant</option>
                                <option value="Bracelet">Bracelet</option>
                                <option value="Ring">Ringt</option>
                            </select>
                            <button onCLick={this.onCLickGems}>Gems</button>
                        </form>
                   
                    </div>
                    <div className="jewels">
                        <button onClick={this.onClickJewels}>Jewels</button>
                    </div>
                    
                    <div className="myJewels">
                        {this.state.jewels.length === 0 ?
                        <h1>Loading &hellip;</h1> : 
                        this.state.jewels.map(g => {
                            return <MyJewelView key={g._id} props={g}/>
                        })}
                    </div>  
                </div>             
            )
        }

        if(this.state.gems.length !== 0) {
            return (
                <div className="myStore">
                    <h1>My Store</h1>
                    <strong>Select button Gems or Jewels!</strong>
                    <div className="gems">
                        <form onSubmit={this.onSubmit}>
                            <select onChange={this.onChange} name="select" value={this.state.selectUpgrade}>
                                <option value="Pendant">Pendant</option>
                                <option value="Bracelet">Bracelet</option>
                                <option value="Ring">Ringt</option>
                            </select>
                            <button onCLick={this.onCLickGems}>Gems</button>
                        </form>
                    </div>
                    <div className="jewels">
                        <button onClick={this.onClickJewels}>Jewels</button>
                    </div>
                    
                    <div className="mygems">
                        {this.state.gems.length === 0 ?
                        <h1>Loading &hellip;</h1> : 
                        this.state.gems.map(g => {
                            return <MyGemView key={g._id} props={g}/>
                        })}
                    </div>  
                    {this.state.gems.length > 2 ? <div className="upgrade">
                            <form onSubmit={this.onSubmitUpgrade}>
                                <select onChange={this.onChangeUpgrade} name="selectUpgrade" value={this.state.selectUpgrade}>
                                    <option value="Ruby">Ruby</option>
                                    <option value="Sapphire">Sapphire</option>
                                    <option value="Amethyst">Amethyst</option>
                                </select>
                                <button>Upgrade</button>
                            </form>
                            <strong>You will loose 3 gems from type of Jewels!</strong>
                    </div> : ''}
                    
                </div>             
            )
        }

        return (
            
            <div className="myStore">
                <h1>My Store</h1>
                <strong>Select button Gems or Jewels!</strong>
                <div className="gems">
                    <select onChange={this.onChange} name="select" value={this.state.select}>
                        <option value="Pendant">Pendant</option>
                        <option value="Bracelet">Bracelet</option>
                        <option value="Ring">Ringt</option>
                    </select>
                    <button onClick={this.onClickGems}>Gems</button>
                </div>
                <div className="jewels">
                    <button onClick={this.onClickJewels}>Jewels</button>
                </div>

                <h1>No selected Gems or Jewels!</h1>              
            </div>
        );
    }
}

export default withRouter(MyStore);
