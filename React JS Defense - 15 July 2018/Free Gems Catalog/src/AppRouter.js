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

//Gems Component
const AllGems = React.lazy(() => import('./components/Gems/AllGems/AllGems.jsx'));

//Public Jewels Component
const AllPublicJewels = React.lazy(() => import('./components/PublicJewels/AllPublicJewels/AllPublicJewels.jsx'));

//Jewels Component
const AllJewels = React.lazy(() => import('./components/Jewels/AllJewels/AllJewels.jsx'));

//MyRoom Component
const MyRoom = React.lazy(() => import('./components/MyRoom/MyRoom.jsx'));

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

            <Route exact path="/gems/allGems" render={() => auth.isLogged() ? <AllGems/> : <Home/>}/>

            <Route exact path="/publicJewels/allPublicJewels" render={() => auth.isLogged() ? <AllPublicJewels/> : <Home/>}/>

            <Route exact path="/allJewels/listFromJewels" render={() => auth.isLogged() ? <AllJewels/> : <Home/>}/>

            <Route exact path="/myRoom/privateRoomSection" render={() => auth.isLogged() ? <MyRoom/> : <Home/>}/>


        
            <Route path="**" component={NoFindPage} />
        </Switch>
    </Suspense>
);

export default withRouter(AppRouter);