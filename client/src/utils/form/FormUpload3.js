import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import { rentalImageUpload } from '../../actions/rentals.action';


export class FormUpload3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        }
    }

    singleFileChangedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    singleFileUploadHandler = () => {
        const data = new FormData();// If file selected

        if (this.state.selectedFile) {
            data.append('rentalImage', this.state.selectedFile, this.state.selectedFile.name);

            // post
            axios.post('/api/rentals/rental-image-upload', data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
                .then((response) => {
                    if (200 === response.status) {
                        // If file size is larger than expected.
                        if (response.data.error) {
                            if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                                this.ocShowAlert('Max size: 2MB', 'red');
                            } else {
                                console.log(response.data);// If not the given file type
                                this.ocShowAlert(response.data.error, 'red');
                            }
                        } else {
                            // Success
                            let fileName = response.data;
                            console.log('fileName', fileName);
                            this.ocShowAlert('File Uploaded', '#3089cf');
                        }
                    }
                }).catch((error) => {
                    // If another error
                    this.ocShowAlert(error, 'red');
                });
        } else {
            // if file not selected throw error
            this.ocShowAlert('Please upload file', 'red');
        }
    };

    // ShowAlert Function
    ocShowAlert = (message, background = '#3089cf') => {
        let alertContainer = document.querySelector('#oc-alert-container'),
            alertEl = document.createElement('div'),
            textNode = document.createTextNode(message);
        alertEl.setAttribute('class', 'oc-alert-pop-up');
        $(alertEl).css('background', background);
        alertEl.appendChild(textNode);
        alertContainer.appendChild(alertEl);
        setTimeout(function () {
            $(alertEl).fadeOut('slow');
            $(alertEl).remove();
        }, 3000);
    };

    render() {
        const { selectedFile } = this.state;

        return (
            <div className='img-upload-container'>
                <label className='img-upload' style={{ margin: '1rem 0' }}>
                    <p>
                        <span className="button button-gray">
                            <i class="fas fa-file-image"></i>
                        </span>
                        <span style={{ marginLeft: '5px' }}>Upload an image</span>
                    </p>
                    <input
                        type='file'
                        accept='.jpg, .png, .jpeg, .gif '
                        onChange={this.singleFileChangedHandler} />
                </label>
                <br />
                {selectedFile &&
                    <button className='btn btn-success btn-upload'
                        type='button'
                        disabled={!selectedFile}
                        onClick={() => this.singleFileUploadHandler()}
                        style={{ marginBottom: '1rem' }}
                    >
                        Add Image
              </button>
                }

                {/* <div>
                    <img 
                        src={initialImageBase64} alt={imageBase64}
                        style={{ width: '50%', height: '30%'}}
                    />
                </div> */}

                {/* {imageBase64 &&
                    <div className='img-preview-container'>
                        <div className='img-preview'
                            style={{ 'backgroundImage': 'url(' + imageBase64 + ')' }}>
                        </div>

                        {this.renderSpinningCircle()}
                    </div>
                } */}

                {/* {this.renderImageStatus()} */}
            </div>
        )
    }
}