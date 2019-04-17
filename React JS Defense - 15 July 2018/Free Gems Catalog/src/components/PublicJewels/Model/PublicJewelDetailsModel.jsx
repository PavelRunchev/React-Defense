import React from 'react';
import './PublicJewelDetailsModel.scss';

const PublicJewelDetailsModel = (props) => {
    const jewel = props.value;
    return (
        <div className="jewel">
            <h4>Name: {jewel.name}</h4>
            <h4>Owner: {jewel.owner}</h4>               
            <img src={jewel.imageUrl} alt="gallery"/>
            <h4>Rating: {jewel.raiting}</h4>
            <h4>Type: {jewel.type}</h4>
            <h4>Created from: {jewel.gems}</h4>
        </div>
    );
};

export default PublicJewelDetailsModel;