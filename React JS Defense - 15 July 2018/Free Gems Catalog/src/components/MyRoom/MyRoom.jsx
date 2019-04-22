import React, { Component } from 'react';
import './MyRoom.scss';
import { withRouter } from 'react-router-dom';
import RequestUser from '../../utils/RequestUser';
import RequestMyJewels from '../../utils/RequestMyJewels';
import RequestJewels from '../../utils/RequestJewels';
import MyJewelsList from './MyJewelsList/MyJewelsList';
import MyGems from './MyGems/MyGems';
import MyProfile from './MyProfile/MyProfile';
import Loading from '../Loading/Loading';
import toastr from 'toastr';

const Context = React.createContext([]);

export const ContextProvider = Context.Provider;
export const ContextConsumer = Context.Consumer;

class MyRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myJewels: [],
            myProfile: {},
            allJewels: [],
            clickForMyJewels: false
        };

        this.onViewMyJewels = this.onViewMyJewels.bind(this);
    }

    async componentDidMount() {
        const myProfile = await RequestUser.infoForMe();
        if(myProfile.error) {
            return toastr.error('No you are Authorization!');
        }

        const allJewels = await RequestJewels.allJewels();
        if(allJewels.error) {
            return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
        }

        this.setState({ myProfile, allJewels });
    }

    async onViewMyJewels(e) {
        e.preventDefault();
        const user = localStorage.getItem('username');

        if(user === null) {
            return toastr.warning('No you are Authorization!');
        }

        try{
            const myJewels = await RequestMyJewels.getMyJewels(user);
            if(myJewels.error) {
                return toastr.error('This operation is denied, invalid credentils! Please, sign in system for access!');
            }
    
            this.setState({ 
                myJewels,
                clickForMyJewels: true
            });   
        }catch(error) { console.log(error.message); }
    }

    render () {
        const { myJewels, myProfile, allJewels, clickForMyJewels } = this.state;

        return (
            <div className="container-fluid myRoom">
                <h2>Your Private Room</h2>
                <div className="inner-myRoom">  
                    {!myJewels.length ? '' : myJewels.length >= allJewels.length ? 
                        <div className="congratulation">
                            <h3>Congratulation!</h3>
                            <h4>You collected all Jewels!</h4>
                        </div> : ''
                    }    
                    <ContextProvider value={myJewels}>           
                        <MyGems/>
                        <MyJewelsList data={myJewels} handler={this.onViewMyJewels} value={clickForMyJewels}/>
                    </ContextProvider> 
                    {myProfile === {} ? <Loading/> : <MyProfile data={myProfile}/>}
                </div>               
            </div>
        );
    }
}

export default withRouter(MyRoom);