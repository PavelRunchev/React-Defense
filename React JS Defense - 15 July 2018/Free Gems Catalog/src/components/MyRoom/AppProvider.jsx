import React from 'react';
import Preloader from '../HOC/Preloader';

const Context = React.createContext([]);
  
class AppProviderBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: this.props.match.url
        };
    }

    render () {
        console.log(this.props.myJewels);
        return <Context.Provider value={this.state.url}>
        </Context.Provider>;
    }
}

const AppProvider = Preloader(AppProviderBase);

export default AppProvider;