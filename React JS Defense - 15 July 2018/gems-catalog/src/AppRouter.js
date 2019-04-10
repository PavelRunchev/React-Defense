import React, { Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loading from './components/Loading/Loading';
//import auth from  './utils/Auth';

import Home from './components/shared-components/Home/Home';
import SoftwareTechnology from './components/shared-components/SoftwareTechnology/SoftwareTechnology';
import Support from './components/shared-components/Support/Support';
import SpecialThanks from './components/shared-components/SpecialThanks/SpecialThanks';
import NoFindPage from './components/shared-components/NoFindingPage/NoFindingPage';



const AppRouter = () => (
    
    <Suspense fallback={<Loading />}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
            <Route path="/view/:page" component={Home}/>

            <Route path="/specialThanks" component={SpecialThanks}/>
            <Route path="/softwareTechnology" component={SoftwareTechnology}/>
            <Route path="/support" component={Support}/>
        
            <Route path="**" component={NoFindPage} />
        </Switch>
    </Suspense>
);

export default withRouter(AppRouter);