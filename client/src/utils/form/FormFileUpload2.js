import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { rentalImageUpload } from '../../actions/rentals.action';

export class FormFileUpload2 extends Component {
    constructor(props) {
        super(props);
        // 
        this.setupReader()

        this.state = {
            selectedFile: null,
            imageBase64: '',
            initialImageBase64: '',
            pending: false,
            status: 'INIT',
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            this.setState({
                selectedFile,
                initialImageBase64: ''
            });

            this.reader.readAsDataURL(selectedFile);
        }
    }

    // Set up image reader
    setupReader() {
        this.reader = new FileReader();

        this.reader.addEventListener('load', (event) => {
            const { initialImageBase64 } = this.state;

            const imageBase64 = event.target.result;

            if (initialImageBase64) {
                this.setState({ imageBase64 });
            } else {
                this.setState({ 
                    imageBase64, 
                    initialImageBase64: imageBase64 
                });
            }
        })
    }

    // RESET IMAGE
    resetToDefaultState(status) {
        this.setState({
            pending: false,
            status,
            selectedFile: undefined,
            initialImageBase64: '',
            imageBase64: ''
        });
    }

    onError(error) {
        this.setState({ 
            pending: false, 
            status: 'FAIL' 
        });
    }

    onSuccess(uploadedImage) {
        const { onChange } = this.props.input || this.props;
        this.resetToDefaultState('OK');
        onChange(uploadedImage);
    }

    onImageLoaded(image) {
        if (image.naturalWidth < 950 && image.naturalHeight < 720) {

            this.resetToDefaultState('INIT');
            toast.error('Minimum width of an image is 950px and height 720px');
            return;
        }
    }

    uploadImage() {
        const { selectedFile } = this.state;
        console.log(selectedFile);

        if (selectedFile) {
            // update state
            this.setState({ 
                pending: true, 
                status: 'INIT' 
            });
            rentalImageUpload(selectedFile.name)
                .then(
                    (uploadedImage) => { 
                        console.log(uploadedImage)
                        this.onSuccess(uploadedImage) 
                    },
                    (error) => { 
                        console.log(error)
                        this.onError(error) 
                    })
        }
    }

    renderSpinningCircle() {
        const { pending } = this.state;

        if (pending) {
            return (
                <div className='img-loading-overlay'>
                    <div className='img-spinning-circle'>
                    </div>
                </div>
            )
        }
    }

    renderImageStatus() {
        const { status } = this.state;

        if (status === 'OK') {
            return <div className='alert alert-success'> Image Uploaded Succesfuly! </div>
        }

        if (status === 'FAIL') {
            return <div className='alert alert-danger'> Image Upload Failed! </div>
        }
    }

    render() {
        const { selectedFile, imageBase64, initialImageBase64 } = this.state;

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
                        onChange={this.onChange} />
                </label>
                <br />
                {selectedFile &&
                    <button className='btn btn-success btn-upload'
                        type='button'
                        disabled={!selectedFile}
                        onClick={() => this.uploadImage()}
                        style={{ marginBottom: '1rem' }}
                    >
                        Add Image
              </button>
                }

                <div>
                    <img 
                        src={initialImageBase64} alt={imageBase64}
                        style={{ width: '50%', height: '30%'}}
                    />
                </div>

                {imageBase64 &&
                    <div className='img-preview-container'>
                        <div className='img-preview'
                            style={{ 'backgroundImage': 'url(' + imageBase64 + ')' }}>
                        </div>

                        {this.renderSpinningCircle()}
                    </div>
                }

                {this.renderImageStatus()}
            </div>
        )
    }
}