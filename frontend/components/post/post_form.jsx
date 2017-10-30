import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      });
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const post = this.state;
    this.setState({
      text: ""
    }, () => {
      this.props.createPost(post);
    });
  }

  render(){
    if (this.props.currentUser) {
      return(
        <div>
          <form>
            <div className="post-form-container">
              <div className="post-form-option-container">
                <p className="make-a-post">Make Post</p>
              </div>
              <div className="post-inner-container">
                <img className="post-form-image" src={ this.props.currentUser.image_url }></img>
                <textarea className="post-input-field" onChange={ this.update('text') } value={ this.state.text } placeholder="What's on your mind?"></textarea>
              </div>
              <div className="post-form-button-container">
                <button className="post-submit-button" onClick={ this.onSubmit }>Post</button>
              </div>
            </div>

          </form>
        </div>
      );
    } else {
      return (
        <div>
          goodbye
        </div>
      );
    }
  }
}

export default PostForm;
