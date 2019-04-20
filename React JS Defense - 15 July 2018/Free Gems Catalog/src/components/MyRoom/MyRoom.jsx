import React, { Component } from 'react';
import './MyRoom.scss';
import { withRouter } from 'react-router-dom';
import RequestUser from '../../utils/RequestUser';
import RequestMyJewels from '../../utils/RequestMyJewels';
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
            myJewels: this.props.data,
            myProfile: {}
        };

        this.onViewMyJewels = this.onViewMyJewels.bind(this);
    }

    async componentDidMount() {
        const myProfile = await RequestUser.infoForMe();
        if(myProfile.error) {
            return toastr.error('No you are Authorization!');
        }

        this.setState({ myProfile });
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
    
            this.setState({ myJewels });    
        }catch(error) { console.log(error.message); }
    }

    render () {
        const { myJewels, myProfile } = this.state;

        return (
            <div className="container-fluid myRoom">
                <h2>Your Private Room</h2>
                <div className="inner-myRoom">                  
                    <MyGems/>
                    <MyJewelsList data={myJewels} handler={this.onViewMyJewels}/>
                    {myProfile === {} ? <Loading/> : <MyProfile data={myProfile}/>}
                </div>               
            </div>
        );
    }
}

export default withRouter(MyRoom);