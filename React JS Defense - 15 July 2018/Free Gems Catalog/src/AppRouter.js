import React, { Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import auth from  './utils/Auth';

import Home from './components/shared-components/Home/Home';
import SoftwareTechnology from './components/shared-components/SoftwareTechnology/SoftwareTechnology';
import Support from './components/shared-components/Support/Support';
import SpecialThanks from './components/shared-components/SpecialThanks/SpecialThanks';
import Contacts from './components/shared-components/Contacts/Contacts';
import NoFindPage from './components/shared-components/NoFindingPage/NoFindingPage';

import SignIn from './components/shared-components/SignIn/SignIn';
import SignUp from  './components/shared-components/SignUp/SignUp';

//Gems Components
const GemsListSection = React.lazy(() => import('./components/Gems/GemsListSection/GemsListSection'));

//Public Jewels Components
const PublicJewelsListSection = React.lazy(() => import('./components/PublicJewels/PublicJewelsListSection/PublicJewelsListSection'));

//Jewels Components
const JewelsListSection = React.lazy(() => import('./components/Jewels/JewelsListSection/JewelsListSection'));

//MyRoom Components
const MyRoom = React.lazy(() => import('./components/MyRoom/MyRoom.jsx'));

//UserOptions Component
const AdminOptions = React.lazy(() => import('./components/AdminOptions/AdminOptions'));
const EditUser = React.lazy(() => import('./components/AdminOptions/EditUser/EditUser.jsx'));

const AppRouter = () => (
    
    <Suspense fallback={<Loading />}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
            <Route path="/view/:page" component={Home}/>

            <Route path="/specialThanks" component={SpecialThanks}/>
            <Route path="/softwareTechnology" component={SoftwareTechnology}/>
            <Route path="/support" component={Support}/>
            <Route path="/contact" component={Contacts}/>

            <Route path="/signIn" component={SignIn}/>
            <Route path="/signUp" component={SignUp}/>

            <Route exact path="/gems/allGems" render={() => auth.isLogged() ? <GemsListSection/> : <Home/>}/>

            <Route exact path="/publicJewels/allPublicJewels" render={() => auth.isLogged() ? <PublicJewelsListSection/> : <Home/>}/>

            <Route exact path="/allJewels/listFromJewels" render={() => auth.isLogged() ? <JewelsListSection/> : <Home/>}/>

            <Route exact path="/myRoom/privateRoomSection" render={() => auth.isLogged() ? <MyRoom/> : <Home/>}/>

            <Route exact path="/admin/adminOptions" render={() => auth.isLogged() ? <AdminOptions/> : <Home/>}/>
            <Route exact path="/adminOptions/edit-user/:id" render={() => auth.isLogged() ? <EditUser/> : <Home/>}/>
            <Route path="**" component={NoFindPage} />
        </Switch>
    </Suspense>
);

export default withRouter(AppRouter);