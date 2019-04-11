import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Gem.scss';
import DateConvertor from '../../../utils/DateConvertor';

let Gem = props => {
    const params = props;
    return (
        <div id="gem">
            <div className="card-title gem-index">{params.props.index}</div>
            <div className="gem-name">Name: {params.props.name}</div>
            <img src={params.props.imageUrl} className="gem-image" alt="gallery" />           
            <div className="card-text gem-create-time">Added before: {DateConvertor(params.props._kmd.ect)}</div>
            <div className="gem-view">              
                <Link to={`/allGems/detailsGem/${params.props._id}`}>Details</Link>
            </div>
        </div>
    );
};

export default withRouter(Gem);