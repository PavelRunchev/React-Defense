import React from 'react';
import Loading from '../Loading/Loading';
import RequestGems from '../../utils/RequestGems';
import RequestPublicJewels from '../../utils/RequestPublicJewels';
import RequestJewels from '../../utils/RequestJewels';
import toastr from 'toastr';

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

        componentDidMount() {
            if(this.props.url === '/gems/allGems') {
                RequestGems.allGems()
                    .then(data => {
                        if(data.error === 'InvalidCredentials') {
                            return toastr.error('No Authentication! Try Again Sign In!');
                        }

                        this.setState({ ready: true, data: data });
                    }).catch(error => console.log(error));
            } else if(this.props.match.url === '/publicJewels/allPublicJewels') {
                RequestPublicJewels.allPublicJewels()
                    .then(data => {
                        if(data.error === 'InvalidCredentials') {
                            return toastr.error('No Authentication! Try again sign in!');
                        }

                        data.sort((a, b) => Number(b.raiting) - Number(a.raiting));
                        this.setState({ ready: true, data });
                    }).catch(error => console.log(error));;
            } else if(this.props.match.url === '/jewels/allJewels/listFromJewels') {
                RequestJewels.allJewels().then(data => {
                    if(data.error === 'InvalidCredentials') {
                        return toastr.error('No Authentication! Try again sign in!');
                    }

                    this.setState({ ready: true, data });
                }).catch(error => console.log(error));;
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
            let listFromItems = [];

            if(data.length !== 0) {
                for (let i = 1; i <= Math.ceil(data.length / itemsForPage); i++) {
                    pageNumbers.push(i);
                }
        
                const lastIndex = currentPage * itemsForPage;
                const firstIndex = lastIndex - itemsForPage;
                listFromItems = data.slice(firstIndex, lastIndex);
            }

            if(this.state.data.length === 0 && this.state.ready) {
                return <h3 className="h3 text-warning my=5">No content to the Base or no access!</h3>;
            }

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