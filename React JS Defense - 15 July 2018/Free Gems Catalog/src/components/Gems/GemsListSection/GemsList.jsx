import React, { Fragment } from 'react';
import './GemsList.scss';
import { withRouter } from 'react-router-dom';
import Preloader from '../../HOC/Preloader';
import toastr from 'toastr';
import RequestGems from '../../../utils/RequestGems';
import Loading from '../../Loading/Loading';
import Gem from '../Model/Gem';
import SearchGems from '../SearchGems/SearchGems';

class GemsListBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gemsList: this.props.data,
            currentPage: 1,
            gemsForPage: 3,
            searchName: ''
        };

        //Pagination Handler
        this.handleClick = this.handleClick.bind(this);
        this.nextHandler = this.nextHandler.bind(this);
        this.prevHandler = this.prevHandler.bind(this);
        //Submit Search Gems
        this.onSubmit = this.onSubmit.bind(this);
        //Search Gems Handler
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    // componentDidMount() {
    //     this.setState({ gemsList: this.props.data });
    //     console.log(this.state.gemsList);
    // }

    onChangeHandler(e) { this.setState({ searchName: e.target.value }); }

    handleClick(e) {
        e.preventDefault();
        this.setState({ currentPage: Number(e.target.id) });
    }

    nextHandler(e) {
        e.preventDefault();
        const { gemsList, currentPage, gemsForPage } = this.state;
        const allPages = Math.ceil(gemsList.length / gemsForPage);
        const nextPage = currentPage === allPages ? currentPage : currentPage + 1;
        
        this.setState({ currentPage: nextPage });
    }

    prevHandler(e) {
        e.preventDefault();
        const { currentPage } = this.state;
        const prevPage = currentPage === 1 ? currentPage : currentPage - 1;

        this.setState({ currentPage: prevPage });
    }

    async onSubmit(e) {
        e.preventDefault();
        const search = this.state.searchName;

        if(search === '') {
            return toastr.warning('Search cannot be empty!');
        }

        if(!search.match('^[A-Za-z]+$')) {
            return toastr.warning('Name must be contains only letters!');
        }
        //Compre first letter is uppercase!
        if(search[0] !== search[0].toUpperCase()) {
            return toastr.warning('First letter must be Capital!');
        }
        
        try{
            const findingGems = await RequestGems.searchGems(search);
            this.setState({ gemsList: findingGems });
        }catch(err) { toastr.danger(err.message); }
    }

    componentDidUpdate() { }

    render() {
        const { gemsList, currentPage, gemsForPage } = this.state;

        const lastIndex = currentPage * gemsForPage;
        const firstIndex = lastIndex - gemsForPage;
        const currentViewForGems = gemsList.slice(firstIndex, lastIndex);

        const renderGems = currentViewForGems.map((g, i) => {
            return <Gem key={g._id} id={i + 1} props={g}/>;
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(gemsList.length / gemsForPage); i++) {
            pageNumbers.push(i);
        }

        const renderPage = pageNumbers.map((number, index) => {
            return (
                <li className={currentPage === number ? 'page-item active' : 'page-item'} key={number}>
                    <a className="page-link" href="void(0)" key={number} id={number} onClick={this.handleClick}>{number}</a>
                </li>
            );
        });

        console.log(renderGems);
        return (
            <div className="inner-allGems">
                
                {!renderGems.length ? <Loading/> : 
                    <Fragment>
                        <SearchGems value={[this.onSubmit, this.onChangeHandler]}/>
                        <div className="gems">
                            {renderGems}
                        </div>
                        <div id="page-numbers">
                            {!renderPage.length ? <h1>Loading &hellip;</h1> :
                                <ul className="pagination pagination-lg">
                                    <li className="page-item">
                                        <button className="page-link" onClick={this.prevHandler}>&laquo;</button>
                                    </li>
                                    {renderPage}
                                    <li className="page-item">
                                        <button className="page-link" id="next" onClick={this.nextHandler}>&raquo;</button>
                                    </li>
                                </ul>  
                            }     
                        </div>
                    </Fragment>
                }  
            </div>
        );
    };
}

const GemsList = Preloader(GemsListBase);

export default withRouter(GemsList);


