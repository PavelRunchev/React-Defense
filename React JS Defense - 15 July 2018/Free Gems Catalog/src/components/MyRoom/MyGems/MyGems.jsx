import React, { Component } from 'react';
import './MyGems.scss';
import { withRouter } from 'react-router-dom';
import FormMyGem from './FormByMyGemName/FormMyGem';
import UpgradeForm from './UpgradeForm/UpgradeForm';
import { ContextConsumer } from '../MyRoom';
import RequestMyGems from '../../../utils/RequestMyGems';
import MyGem from '../Model/MyGem';
import toastr from 'toastr';

class MyGems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myGemsBySetRing: undefined,
            myGemsBySetPendant: undefined,
            myGemsBySetBracelet: undefined,
            gemName: 'Amethyst',
            upgradeSet: 'Ring',
            myJewels: this.props.myJewels
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.onUpgrade = this.onUpgrade.bind(this);
    }

    onChangeHandler(e) { this.setState({ [e.target.name]: e.target.value }); }

    async onSearchHandler(e) {
        e.preventDefault();
        const { gemName } = this.state;
        const user = localStorage.getItem('username');
        let setRing = []; let setPendant = []; let setBracelet = [];

        if(user === null) {
            return toastr.error('Not you are is Authorization!');
        }

        try{
            const myGems = await RequestMyGems.allMyGems(user);
            if(myGems.error) {
                return toastr.error('');
            }
            const filteredGemsByName = myGems.filter(g => g.gemsName === gemName);
            console.log(filteredGemsByName);
            for (const gem of filteredGemsByName) {
                if(gem.type === 'Ring') setRing.push(gem);
                else if(gem.type === 'Pendant') setPendant.push(gem);
                else if(gem.type === 'Bracelet') setBracelet.push(gem);
            }
    
            console.log(setRing);
            this.setState({
                myGemsBySetRing: setRing,
                myGemsBySetPendant: setPendant,
                myGemsBySetBracelet: setBracelet
            });
            console.log(setRing);
            console.log(this.state.myGemsBySetRing);
        }catch(error) { console.log(error.message); }
    }

    onUpgrade(e) {
        e.preventDefault();

        console.log('upgrade');
    }

    render() {
        const { myGemsBySetRing, myGemsBySetPendant, myGemsBySetBracelet } = this.state;
        return(
            <div className="myGemsList">
                <h2 className="h2 text-center">Your Gems</h2>
                <FormMyGem handler={[this.onSearchHandler, this.onChangeHandler]}/>
                <div className="container-gems">
                    <section className="gems-ring">
                        {myGemsBySetRing === undefined ? '' : <h3 className="text-center">Gems for Set Ring</h3>}
                        {myGemsBySetRing === undefined ? <h3 className="text-center font-weight-bold">No selected Gem Name!</h3> : 
                            myGemsBySetRing.length === 0 ? <h4 className="text-center text-warning font-weight-bold">No Gems from this Set!</h4> : 
                                <div className="gems-ring-list">
                                    {myGemsBySetRing.map(r => {
                                        return <MyGem key={r._id} props={r}/>;
                                    })}
                                </div> 
                        }
                    </section>
                    <section className="gems-pendant">
                        {myGemsBySetPendant === undefined ? '' : <h3 className="text-center">Gems for Set Pendant</h3>}
                        {myGemsBySetPendant === undefined ? <h3 className="text-center font-weight-bold">No selected Gem Name!</h3> : 
                            myGemsBySetPendant.length === 0 ? <h4 className="text-center text-warning font-weight-bold">No Gems from this Set!</h4> : 
                                <div className="gems-pendant-list">
                                    {myGemsBySetPendant.map(p => {
                                        return <MyGem key={p._id} props={p}/>;
                                    })}
                                </div> 
                        }
                    </section>
                    <section className="gems-bracelet">
                        {myGemsBySetBracelet === undefined ? '' : <h3 className="text-center">Gems for Set Bracelet</h3>}
                        {myGemsBySetBracelet === undefined ? <h3 className="text-center font-weight-bold">No selected Gem Name!</h3> : 
                            myGemsBySetBracelet.length === 0 ? <h4 className="text-center text-warning font-weight-bold">No Gems from this Set!</h4> : 
                                <div className="gems-bracelet-list">
                                    {myGemsBySetBracelet.map(b => {
                                        return <MyGem key={b._id} props={b}/>;
                                    })}
                                </div> 
                        }
                    </section>
                </div>
                <ContextConsumer>
                    {
                        (myJewels) => <UpgradeForm handler={[this.onUpgrade, this.onChangeHandler]} myJewels={myJewels}/>
                    }
                </ContextConsumer>
            </div>
        );
    }
}

export default withRouter(MyGems);