import React, { Component } from 'react';
import './PublicJewelsList.scss';
import { withRouter } from 'react-router-dom';
import Preloader from '../../HOC/Preloader';
import PublicJewel from '../Model/PublicJewel';

class PublicJewelsListBase extends Component {
    render () {
        const data = this.props.data;
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
            <div className="inner-publicJewels">
                <div className="publicJewels">
                    {data.map((g, i) => {
                        return <PublicJewel key={g._id} props={g}/>;
                    })}
                </div>
                <div id="page-numbers">
                    {renderPage.length === 0 ? <h1>Loading &hellip;</h1> :
                        <ul className="pagination pagination-xl ">
                            <li className="page-item">
                                <button className="page-link" onClick={prevHandler}>&laquo;</button>
                            </li>
                            {renderPage}
                            <li className="page-item">
                                <button className="page-link" id="next" onClick={nextHandler}>&raquo;</button>
                            </li>
                        </ul>  
                    }     
                </div>
            </div>
        );
    }
}

const PublicJewelsList = Preloader(PublicJewelsListBase);

export default withRouter(PublicJewelsList);