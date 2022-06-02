import React, {Component} from 'react';
import {Result, Photo} from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {

    handleClick = (event) => {
        const modalImage = this.props.result.largeImageURL;
        this.props.modalPhoto(modalImage);
        this.props.onClick();
    };

    render () {
        const {webformatURL, tags} = this.props.result;
        
        return (
            <Result className="gallery-item" onClick={this.handleClick}>
                <Photo src={webformatURL} alt={tags} />
            </Result>
        );
    };
};
