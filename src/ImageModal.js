/* eslint-disable space-before-function-paren */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Modal } from 'semantic-ui-react';
import { FULLSIZE } from './constants';


class ImageModal extends Component {
    imageFinder(array, id) {
        try {
            if (!array || !id) {
                throw new Error("Missing params to find image.");
            }
            let correctImgObj;
            array.forEach(imageObj => {
                if (imageObj.id === id) {
                    correctImgObj = imageObj;
                }
            });
            return correctImgObj;
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        let image = this.imageFinder(this.props.images, this.props.id);
        let { url, title } = this.props.urlBuilder(image, FULLSIZE);
        return (
            <Modal dimmer size="large" open={this.props.open} onClose={this.props.close}>
                <Modal.Header >{title}</Modal.Header>
                <Modal.Content image>
                    <Image centered size="huge" src={url} />
                </Modal.Content>
            </Modal>
        );
    }
}

ImageModal.propTypes = {
    images: PropTypes.array,
    urlBuilder: PropTypes.func,
    open: PropTypes.bool,
    close: PropTypes.func,
    id: PropTypes.string
};

export default ImageModal;
