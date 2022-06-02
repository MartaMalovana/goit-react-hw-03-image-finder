import { Component } from "react";
import { createPortal } from "react-dom";
import {Overlay, ModalImage, Button} from './Modal.styled';

const modalRoot = document.querySelector('#root-modal');

export default class Modal extends Component {

    handleClick = () => {
        this.props.onClick();
    };

    render () {
        return createPortal(
            <Overlay className="overlay" onClick={this.handleClick}>
                <ModalImage className="modal">
                    <img src={this.props.modalImg} alt="" />
                </ModalImage>
                <Button type="button">CLOSE</Button>
            </Overlay>, modalRoot
        );
    };
};