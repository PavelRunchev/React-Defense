import React, { Component } from 'react';
import './MyJewelsList.scss';
import { withRouter } from 'react-router-dom';
import Preloader from '../../HOC/Preloader';
import MyJewel from '../Model/MyJewel';

class MyJewelsListBase extends Component {
    render () {
        //sort by create date!
        const data = this.props.data.sort((a,b) => b._kmd.lmt.localeCompare(a._kmd.lmt));

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
            <div className="inner-myJewels">
                <h3 className="h2">Your Jewels</h3>
                <div className="myJewels">
                    {data.map((g, i) => {
                        return <MyJewel key={g._id} props={g}/>;
                    })}
                </div>
                <div className="page-numbers">
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

const MyJewelsList = Preloader(MyJewelsListBase);

export default withRouter(MyJewelsList);