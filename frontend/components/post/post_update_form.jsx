import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

class PostUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.post.text
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

    const post = Object.assign({}, this.state);
    if (
      this.props.match.path !== "/" &&
      Number(this.props.match.params.userId) !== this.props.currentUser.id
    ) {
      post.profile_id = this.props.match.params.userId;
    } else {
      post.profile_id = this.props.currentUser.id;
    }
    if (post.text !== "") {
      this.props.createPost(post).then(() => {
        this.setState({
          text: ""
        });
      });
    }
  }

  render() {
    if (this.props.currentUser && this.props.user) {
      return (
        <div>
          <form>
            <div className="post-form-container">
              <div className="post-inner-container">
                <img
                  className="post-form-image"
                  src={this.props.user.image_url}
                />
                <textarea
                  className="post-input-field"
                  onChange={this.update("text")}
                  value={this.state.text}
                  placeholder="What's on your mind?"
                />
              </div>
              <div className="post-form-button-container">
                <button className="post-submit-button" onClick={this.onSubmit}>
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="loading-spin">
          <RingLoader size={100} color={"#0000FF"} />
        </div>
      );
    }
  }
}

export default PostUpdateForm;
