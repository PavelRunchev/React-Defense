import React from 'react';
import './SearchGems.scss';
import { withRouter } from 'react-router-dom';

const SearchGems = (props) => {
    return (
        <div className="searchGems">
            <form onSubmit={props.value[0]}>
                <input name="searchGems" placeholder="Search by Name" onChange={props.value[1]}/>
                <button>Search Gems</button>
            </form>
        </div>
    );
};

export default withRouter(SearchGems);