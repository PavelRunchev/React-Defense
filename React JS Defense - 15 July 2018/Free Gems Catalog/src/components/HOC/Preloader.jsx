import React from 'react';
import Loading from '../Loading/Loading';
import RequestGems from '../../utils/RequestGems';
import RequestPubliBaecJewels from '../../utils/RequestPublicJewels';
import RequestJewels from '../../utils/RequestJewels';
import RequestMyJewels from '../../utils/RequestMyJewels';

export default function Preloader(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                ready: false,
                data: []
            };
        }

        async componentDidMount() {
            if(this.props.url === '/gems/allGems') {
                const data = await RequestGems.allGems();
                this.setState({ ready: true, data: data });
                console.log(this.state.data);
            } else if(this.props.match.url === '/publicJewels/allPublicJewels') {
                RequestPubliBaecJewels.allPublicJewels()
                    .then(data => {
                        this.setState({ ready: true, data });
                    });
            } else if(this.props.match.url === '/allJewels/listFromJewels') {
                RequestJewels.allJewels().then(data => this.setState({ ready: true, data }));
            }  else if(this.props.match.url === '/myRoom/privateRoomSection') {
                const user = localStorage.getItem('username');
                if(user !== null) {
                    RequestMyJewels.allMyJewels(user).then(data => {
                        this.setState({ ready: true, data });
                        console.log(data);
                    });
                }  
            }     
        }

        render() {
            if(this.state.ready) {
                return <WrappedComponent data={this.state.data} {...this.props}/>;
            }

            return <Loading/>;
        }
    };
}