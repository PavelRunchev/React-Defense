import React, { Component } from 'react';
import './MyGems.scss';
import { withRouter } from 'react-router-dom';
import FormMyGem from './FormByMyGemName/FormMyGem';
import UpgradeForm from './UpgradeForm/UpgradeForm';
import { ContextConsumer } from '../MyRoom';

import RequestMyGems from '../../../utils/RequestMyGems';
import RequestJewels from '../../../utils/RequestJewels';

import MyGem from '../Model/MyGem';
import toastr from 'toastr';
import uuid from 'uuid';
import swal from 'sweetalert';
import RequestMyJewels from '../../../utils/RequestMyJewels';

class MyGems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myGemsBySetRing: undefined,
            myGemsBySetPendant: undefined,
            myGemsBySetBracelet: undefined,
            gemName: 'Amethyst',
            upgradeSet: 'Ring',
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
                return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
            }
            const filteredGemsByName = myGems.filter(g => g.gemsName === gemName);
            for (const gem of filteredGemsByName) {
                if(gem.type === 'Ring') setRing.push(gem);
                else if(gem.type === 'Pendant') setPendant.push(gem);
                else if(gem.type === 'Bracelet') setBracelet.push(gem);
            }
    
            this.setState({
                myGemsBySetRing: setRing,
                myGemsBySetPendant: setPendant,
                myGemsBySetBracelet: setBracelet
            });
        }catch(error) { console.log(error.message); }
    }

    //upgrade 3 gems to jewel
    async onUpgrade(e) {
        e.preventDefault();
        const { upgradeSet, gemName, myGemsBySetRing, myGemsBySetPendant, myGemsBySetBracelet } = this.state;
        const user = localStorage.getItem('username');
        let gemsForDelete = [];

        const gemsForSetRing = myGemsBySetRing || [];
        const gemsForSetPendant = myGemsBySetPendant || [];
        const gemsForSetBracelet = myGemsBySetBracelet || [];

        if(user === '' || user === null || user === undefined)
            return toastr.warning('Not you are Authorization to upgrade!');

        if((upgradeSet === 'Ring' && gemsForSetRing.length < 3) 
        || (upgradeSet === 'Pendant' && gemsForSetPendant.length < 3)
        || (upgradeSet === 'Bracelet' && gemsForSetBracelet < 3)) {
            return toastr.warning('You do not have enough gems to upgrade!');
        }

        if(upgradeSet === 'Ring') gemsForDelete = myGemsBySetRing.splice(0, 3);
        if(upgradeSet === 'Pendant') gemsForDelete = myGemsBySetPendant.splice(0, 3);
        if(upgradeSet === 'Bracelet') gemsForDelete = myGemsBySetBracelet.splice(0, 3);

        const willUpgrade = await swal({
            title: 'Are you sure want to upgrade?',
            text: 'You will destroy permanently 3 Gems from this set!',
            icon: 'warning',
            dangerMode: true,
            showCancelButton: true,
        });

        if(willUpgrade) {
            try{
                const allJewelsFromCurrentType = await RequestJewels.getJewelForUpgrade(upgradeSet);
                if(allJewelsFromCurrentType.error) {
                    return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
                }

                const myJewels = await RequestMyJewels.getMyJewels(user);
                if(myJewels.error) {
                    return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
                }
    
                const jewelForUpgrade = allJewelsFromCurrentType.filter(j => j.gems === gemName)[0];
                //If you have jewel - upgrade is failed!
                //Jewels in myRoom is are unique!
                if(myJewels.find(j => j.name === jewelForUpgrade.name)) {
                    return toastr.warning('You already have it this Jewel!');
                }
    
                const newMyJewel = {
                    _id: uuid(),
                    name: jewelForUpgrade.name,
                    owner: user,
                    imageUrl: jewelForUpgrade.imageUrl,
                    gems: jewelForUpgrade.gems,
                    type: jewelForUpgrade.type,
                    raiting: 0
                };
    
                const resJewel = await RequestMyJewels.createMyJewel(newMyJewel);
                if(resJewel.error) {
                    return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
                }
    
                //destroy 3 Gems from this set
                for (let index = 0; index < 3; index++) {
                    const id = gemsForDelete[index]._id;
                    const res = await RequestMyGems.removeMyGem(id);
                    if(res.error) {
                        return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
                    }
                }

                //after deleted 3 gems, they is override without removed elements in state
                this.setState({ myGemsBySetRing, myGemsBySetPendant, myGemsBySetBracelet });
                swal({ title: 'The jewel is created successful!', icon: 'success' });
                toastr.success('The jewel is created successful!');
            }catch(error) { console.log(error.message); }
        }
    }

    componentDidUpdate() { }

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
                            myGemsBySetRing.length === 0 ? <h4 className="text-center font-weight-bold">No Gems from this Set!</h4> : 
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
                            myGemsBySetPendant.length === 0 ? <h4 className="text-center font-weight-bold">No Gems from this Set!</h4> : 
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
                            myGemsBySetBracelet.length === 0 ? <h4 className="text-center font-weight-bold">No Gems from this Set!</h4> : 
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