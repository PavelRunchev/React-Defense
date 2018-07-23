import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import toastr from 'toastr';

import Header from './components/common/Header';

import HomePage from './components/HomePage';
import ContactUs from './components/ContactUs';
import AboutPage from './components/AboutPage';

import RegisterPage from './components/form/RegisterPage';
import LoginPage from './components/form/LoginPage';

import ListGems from './components/Gems/ListGems';
import CreateGems from './components/Gems/CreateGems';
import EditGem from './components/Gems/EditGem';
import CreateJewel from './components/Jewels/CreateJewel';
import DetailsGem from './components/Gems/DetailsGem';
import DeleteGem from './components/Gems/DeleteGem';
import MyStore from './components/Gems/MyStore';
import MyDetailsJewel from './components/Jewels/MyDetailsJewel';
import MyDetailsGem from './components/Gems/MyDetailsGem';
import UpgradedJewels from './components/Jewels/UpgradedJewels';
import DetailsJewel from './components/Jewels/DetailsJewel';
import DeleteComment from './components/Jewels/DeleteComment';
import EditJewel from './components/Jewels/EditJewel';

import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';

class App extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
}

onLogout() {
    localStorage.clear();
    toastr.success('Logout successful')
    this.props.history.push('/');
}



  render() {
    return (
      <div className="App">
        <Header loggedIn={localStorage.getItem('authtoken') != null} onLogout={this.onLogout} />
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/view/:page" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contactUs" component={ContactUs} />

            <PrivateRoute path="/createGems" component={CreateGems} />
            <PrivateRoute path="/editGem/:id" component={EditGem} />
            <PrivateRoute path="/createJewel" component={CreateJewel} />
            <PrivateRoute path="/listGems" component={ListGems} />
            <PrivateRoute path="/upgradedJewels" component={UpgradedJewels} />
            <PrivateRoute path="/detailsGem/:id" component={DetailsGem} />
            <PrivateRoute path="/myDetailsGem/:id" component={MyDetailsGem} />
            <PrivateRoute path="/deleteGem/:id" component={DeleteGem} />
            <PrivateRoute path="/myStore" component={MyStore} />
            <PrivateRoute path="/myDetailsJewel/:id" component={MyDetailsJewel} />
            <PrivateRoute path="/detailsJewel/:id" component={DetailsJewel} />
            <PrivateRoute path="/deleteComment/:id" component={DeleteComment} />
            <PrivateRoute path="/editJewel/:id" component={EditJewel} />

            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
