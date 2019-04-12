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
                data: [],
                currentPage: 1,
                itemsForPage: 3
            };

            this.handleClick = this.handleClick.bind(this);
            this.nextHandler = this.nextHandler.bind(this);
            this.prevHandler = this.prevHandler.bind(this);
        }

        async componentDidMount() {
            if(this.props.url === '/gems/allGems') {
                const data = await RequestGems.allGems();
                this.setState({ ready: true, data: data });
            } else if(this.props.match.url === '/publicJewels/allPublicJewels') {
                RequestPubliBaecJewels.allPublicJewels()
                    .then(data => {
                        data.sort((a, b) => Number(b.raiting) - Number(a.raiting));
                        this.setState({ ready: true, data });
                    });
            } else if(this.props.match.url === '/allJewels/listFromJewels') {
                RequestJewels.allJewels().then(data => this.setState({ ready: true, data }));
            }  else if(this.props.match.url === '/myRoom/privateRoomSection') {
                const user = localStorage.getItem('username');
                if(user !== null) {
                    RequestMyJewels.allMyJewels(user).then(data => {
                        this.setState({ ready: true, data });
                    });
                }  
            }     
        }

        handleClick(e) {
            e.preventDefault();
            this.setState({ currentPage: Number(e.target.id) });
        }
    
        nextHandler(e) {
            e.preventDefault();
            const { currentPage, itemsForPage, data } = this.state;

            const allPages = Math.ceil(data.length / itemsForPage);
            const nextPage = currentPage === allPages ? currentPage : currentPage + 1;
            
            this.setState({ currentPage: nextPage });
        }
    
        prevHandler(e) {
            e.preventDefault();
            const { currentPage } = this.state;
            const prevPage = currentPage === 1 ? currentPage : currentPage - 1;
    
            this.setState({ currentPage: prevPage });
        }

        componentDidUpdate() { }

        render() {
            const { currentPage, itemsForPage, data } = this.state;
            const pageNumbers = [];

            for (let i = 1; i <= Math.ceil(data.length / itemsForPage); i++) {
                pageNumbers.push(i);
            }
    
            const lastIndex = currentPage * itemsForPage;
            const firstIndex = lastIndex - itemsForPage;
            const listFromItems = data.slice(firstIndex, lastIndex);
    
            if(this.state.ready) {
                return <WrappedComponent 
                    data={listFromItems} 
                    {...this.props} 
                    pages={[currentPage, pageNumbers]}
                    handler={[this.handleClick, this.prevHandler, this.nextHandler]}
                />;
            }

            return <Loading/>;
        }
    };
}