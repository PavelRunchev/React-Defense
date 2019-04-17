import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './EnlargementJewel.scss';
import Loading from '../../Loading/Loading';

class EnlargeImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: ''
        };
    }

    componentDidMount() { 
        if(this.state.imageUrl === '') {
            this.getImageUrl();
        }
    }

    componentDidUpdate() {
        if(this.state.imageUrl !== '') {
            this.getMouseWheelImage();
        }
    }

    getImageUrl() {
        let index = this.props.location.pathname.indexOf('https:');
        const imageUrl = this.props.location.pathname.substr(index);
        this.setState({ imageUrl });
        console.log(index);
        console.log(imageUrl);
    }

    getMouseWheelImage() {
        let image = document.getElementById('large-image');
        console.log(image);
        if (image.addEventListener) {
            // IE9, Chrome, Safari, Opera
            image.addEventListener('mousewheel', MouseWheelHandler, false);
            // Firefox
            image.addEventListener('DOMMouseScroll', MouseWheelHandler, false);
        }
        // IE 6/7/8
        else image.attachEvent('onmousewheel', MouseWheelHandler);

        function MouseWheelHandler(e) {
            // cross-browser wheel delta
            var ev = window.event || e; // old IE support
            var delta = Math.max(-1, Math.min(1, (ev.wheelDelta || -ev.detail)));
            image.style.width = Math.max(350, Math.min(600, image.width + (20 * delta))) + 'px';
    
            return false;
        }
    }

    render () {
        const { imageUrl } = this.state;

        return (
            <div className="container-fluid enlargement-jewel">
                <h2 className="text-center">Enlargement with scroll button!</h2>
                <div className="border-image">
                    {imageUrl === '' ? <Loading/> : <img id="large-image" src={`${imageUrl}`} alt="gallery"/>}
                </div>    
            </div>
        );
    }
}

export default withRouter(EnlargeImage);