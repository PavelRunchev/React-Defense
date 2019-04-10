import React from 'react';
import './Loading.scss';

const Loading = () => {
    return (
        <div className="loading">
            <img src={ require('../../image/loading.gif')} alt="logo"/>
        </div>
    );
};

export default Loading;