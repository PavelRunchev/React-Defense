import React from 'react';
import './GemsList.scss';
import { withRouter } from 'react-router-dom';
import Preloader from '../../HOC/Preloader';
import toastr from 'toastr';
import RequestGems from '../../../utils/RequestGems';

import Gem from '../Model/Gem';
import SearchGems from '../SearchGems/SearchGems';
import Loading from '../../Loading/Loading';

class GemsListBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            findingGems: [],
            searchName: ''
        };

        //Search Gems Handler
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeHandler(e) { this.setState({ searchName: e.target.value }); }

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

            this.setState({ findingGems });
        }catch(err) { toastr.danger(err.message); }
    }

    componentWillUpdate() { }

    render() {
        const data = this.props.data;
        const findingGems = this.state.findingGems;
        const [currentPage, pageNumbers] = this.props.pages;
        const [handleClick, prevHandler, nextHandler] = this.props.handler;
      
        const renderPage = pageNumbers.map((number, index) => {
            return (
                <li className={currentPage === number ? 'page-item active' : 'page-item'} key={number}>
                    <a className="page-link" href="void(0)" key={number} id={number} onClick={handleClick}>{number}</a>
                </li>
            );
        });

        return (
            <div className="inner-gems">
                <SearchGems value={[this.onSubmit, this.onChangeHandler]}/>
                {!findingGems.length ? '' :
                    <div className="gems">
                        {findingGems.map((g, i) => {
                            return <Gem key={g._id} index={i + 1} props={g}/>;
                        })}
                    </div>
                }
                <div className="gems">
                    {data.map((g, i) => {
                        return <Gem key={g._id} index={i + 1} props={g}/>;
                    })}
                </div>
                <div className="page-numbers">
                    {renderPage.length === 0 ? <Loading/> :
                        <ul className="pagination pagination-xl ">
                            <li className="page-item">
                                <button className="page-link" onClick={prevHandler}>&laquo;</button>
                            </li>
                            {renderPage}
                            <li className="page-item">
                                <button className="page-link next" onClick={nextHandler}>&raquo;</button>
                            </li>
                        </ul>  
                    }     
                </div>
            </div>
        );
    };
}

const GemsList = Preloader(GemsListBase);

export default withRouter(GemsList);



