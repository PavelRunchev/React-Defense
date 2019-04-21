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
const GemDetails = React.lazy(() => import('./components/Gems/GemDetails/GemDetails'));
const CreateGem = React.lazy(() => import('./components/Gems/CreateGem/CreateGem'));
const EditGem = React.lazy(() => import('./components/Gems/EditGem/EditGem'));

//Public Jewels Components
const PublicJewelsListSection = React.lazy(() => import('./components/PublicJewels/PublicJewelsListSection/PublicJewelsListSection'));
const PublicJewelDetails = React.lazy(() => import('./components/PublicJewels/PublicJewelDetails/PublicJewelDetails'));
const EnlargementJewel = React.lazy(() => import('./components/PublicJewels/EnlargementJewel/EnlargementJewel'));
const EditPublicJewel = React.lazy(() => import('./components/PublicJewels/EditPublicJewel/EditPublicJewel'));

//Jewels Components
const JewelsListSection = React.lazy(() => import('./components/Jewels/JewelsListSection/JewelsListSection'));
const CreateJewel = React.lazy(() => import('./components/Jewels//CreateJewel/CreateJewel'));
const EditJewel = React.lazy(() => import('./components/Jewels/EditJewel/EditJewel'));

//MyRoom Components
const MyRoom = React.lazy(() => import('./components/MyRoom/MyRoom'));
const MyJewelDetails = React.lazy(() => import('./components/MyRoom/MyJewelDetails/MyJewelDetails'));
const MyGemDetails = React.lazy(() => import('./components/MyRoom/MyGemDetails/MyGemDetails'));

//UserOptions Component
const AdminOptions = React.lazy(() => import('./components/AdminOptions/AdminOptions'));
const InfoUser = React.lazy(() => import('./components/AdminOptions/InfoUser/InfoUser'));

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

            <Route exact path="/gems/allGems" render={() => auth.isLogged() ? <GemsListSection/> : <SignIn/>}/>
            <Route exact path="/gems/gemsDetails/:id" render={() => auth.isLogged() ? <GemDetails/> : <SignIn/>}/>
            <Route exact path="/gems/createGem" render={() => auth.isLogged && auth.isAdmin() ? <CreateGem/> : <SignIn/>}/>
            <Route exact path="/gems/editGem/:id" render={() => auth.isLogged() && auth.isAdmin() ? <EditGem/> : <SignIn/>}/>

            <Route exact path="/publicJewels/allPublicJewels" render={() => auth.isLogged() ? <PublicJewelsListSection/> : <SignIn/>}/>
            <Route exact path="/publicJewels/publicJewelDetails/:id" render={() => auth.isLogged() ? <PublicJewelDetails/> : <SignIn/>}/>
            <Route path="/publicJewels/publicJewelDetails/enlargmentJewel/:id" render={() => auth.isLogged() ? <EnlargementJewel/> : <SignIn/>}/>
            <Route exact path="/publicJewels/publicJewelEdit/:id" render={() => auth.isLogged() && auth.isAdmin() ? <EditPublicJewel/> : <SignIn/>}/>
         
            <Route exact path="/jewels/allJewels/listFromJewels" render={() => auth.isLogged() && auth.isAdmin() ? <JewelsListSection/> : <SignIn/>}/>
            <Route exact path="/jewels/createJewel" render={() => auth.isLogged() && auth.isAdmin() && auth.isAdmin() ? <CreateJewel/> : <SignIn/>}/>
            <Route exact path="/jewels/editJewel/:id" render={() => auth.isLogged() && auth.isAdmin() ? <EditJewel/> : <SignIn/>}/>

            <Route exact path="/myRoom/privateRoomSection" render={() => auth.isLogged() ? <MyRoom/> : <SignIn/>}/>
            <Route exact path="/myRoom/privateRoomSection/myJewelDetails/:id" render={() => auth.isLogged() ? <MyJewelDetails/> : <SignIn/>} />
            <Route exact path="/myRoom/privateRoomSection/myGemDetails/:id" render={() => auth.isLogged() ? <MyGemDetails/> : <SignIn/>} />

            <Route exact path="/admin/adminOptions" render={() => auth.isAdmin() || auth.isModerator() ? <AdminOptions/> : <SignIn/>}/>
            <Route exact path="/adminOptions/info-user/:id" render={() => auth.isAdmin() || auth.isModerator() ? <InfoUser/> : <SignIn/>}/>
            <Route path="**" component={NoFindPage} />
        </Switch>
    </Suspense>
);

export default withRouter(AppRouter);