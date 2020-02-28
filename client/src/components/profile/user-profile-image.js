import React, { Component } from 'react';
import ModalLayout from '../../utils/layout/Modal-Layout';
import { uploadUserAvatar } from '../../actions/user.action';


export class ProfileAvatarUpload extends Component {
    state = {
        file: null,
        message: '',
        showModal: false
    }

    getImage = e => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            this.setState({ file });
        }
    };

    uploadFile = e => {
        e.preventDefault();
        const { file } = this.state;

        // uploading image
        uploadUserAvatar(file)
            .then(uploadedImage => {
                console.log(uploadedImage)
                // reload the page
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    // show modal 
    openModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    };

    closeModal = () => {
        this.setState({
            showModal: false
        });
    }

    render() {
        const { message, showModal, file } = this.state;
        console.log(file);

        return (
            <React.Fragment>
                <button
                    className="btn btn-link"
                    onClick={this.openModal}>Change Photo</button>
                <ModalLayout show={showModal} hide={this.closeModal}>
                    <label 
                        className="img-upload"
                        style={{ margin: '0 auto', textAlign: 'center' }}
                    >
                            <span           className="button button-gray">
                                <i class="fas fa-file-image"></i>
                            </span>
                            <p style={{ marginTop: '10px', fontSize: '10px'}}>Select your image*</p>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={this.getImage}
                            style={{ display: 'none' }}
                        />
                    </label>
                    <p>{message}</p>
                    <p>{file ? file.name : ''}</p>
                    {file ? <form onSubmit={this.uploadFile}>
                        <button
                            className="btn btn-primary"
                            id='file-upload-button'>Upload</button>
                    </form> : <button
                        onClick={this.closeModal}
                        className="btn btn-danger"
                    >Close Window</button>
                    }
                </ModalLayout>
            </React.Fragment>
        );
    }
}

