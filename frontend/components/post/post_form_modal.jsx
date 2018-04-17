import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

class PostFormModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.cancelUpload = this.cancelUpload.bind(this);
  }


  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  updateFile(e) {
    let fileReader = new FileReader();
    let file = e.currentTarget.files[0];
    fileReader.onloadend = () => {
      this.setState({
        imageFile: file,
        imageUrl: fileReader.result,
      });
    };

    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({
        imageUrl: "",
        imageFile: null
      });
    }
  }

  cancelUpload(){
    this.setState({
      imageFile: null,
      imageUrl: null
    });
  }

  onSubmit(e){

  }

  render(){
    if (this.props.currentUser.id === parseInt(this.props.match.params.userId) && this.state.imageFile === null) {
      return (
        <div>
          <div onClick={ this.openModal } className="upload-image-container">
            <div className="upload-image-hover">
              <span><i className="fa fa-camera"></i></span>
              <span>Update Profile Picture</span>
            </div>
          </div>
          <Modal
            className="modal"
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
            overlayClassName="modal-background"
            shouldCloseOnOverlayClick={false}
            >
            <div className="modal-heading">
              <h2>Update Profile Picture</h2>
              <h2 className="modal-close-button" onClick={ this.closeModal }>X</h2>
            </div>
            <div className="modal-body-container">
              <div className="modal-body">
                <label htmlFor="profile-image" className="modal-body-label">
                  <i className="fa fa-plus"></i>
                  <h1>Upload Photo</h1>
                </label>
                <input onChange={ this.updateFile } id="profile-image" type="file" />
              </div>
            </div>

          </Modal>
        </div>
      );
    } else if (this.props.currentUser.id === parseInt(this.props.match.params.userId) && this.state.imageFile !== null) {
      return (
        <div>
          <div onClick={ this.openModal } className="upload-image-container">
            <div className="upload-image-hover">
              <span><i className="fa fa-camera"></i></span>
              <span>Update Profile Image</span>
            </div>
          </div>
          <Modal
            className="modal-image"
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            shouldCloseOnOverlayClick={false}
            contentLabel="Example Modal"
            overlayClassName="modal-background"
            >
            <div className="modal-heading">
              <h2>Create Profile Picture</h2>
              <h2 className="modal-close-button" onClick={ this.closeModal }>X</h2>
            </div>
            <div className="modal-image-container">
              <div className="modal-image-body">
                <img className="modal-image-view" src={ this.state.imageUrl }></img>
              </div>
            </div>
            <div className="modal-image-footer">
              <button onClick={ this.cancelUpload } className="image-cancel-button">Cancel</button>
              <button onClick={ this.onSubmit } className="image-save-button">Save</button>
            </div>

          </Modal>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}


export default PostFormModal;
