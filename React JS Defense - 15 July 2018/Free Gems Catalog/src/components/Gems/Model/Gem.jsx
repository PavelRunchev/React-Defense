import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Gem.scss';
import DateConvertor from '../../../utils/DateConvertor';
import auth from '../../../utils/Auth';

let Gem = props => {
    const gem = props.props;
    const index = props.index;
    return (
        <div className="gem">
            <div className="card-title gem-index">{index}</div>
            <div className="gem-name">Name: {gem.name}</div>
            <img src={gem.imageUrl} className="gem-image" alt="gallery" />           
            <div className="card-text gem-create-time">Added before: {DateConvertor(gem._kmd.ect)}</div>
            <div className="gem-view">              
                {auth.isLogged() && auth.isAdmin() && <Link to={`/gems/editGem/${gem._id}`} className="edit-button">Edit</Link>}
                <Link to={`/gems/gemsDetails/${gem._id}`} className="details-button">Details</Link>
            </div>
        </div>
    );
};

export default withRouter(Gem);