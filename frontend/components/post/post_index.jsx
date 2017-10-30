import React, { Component } from 'react';
import moment from 'moment';

class PostIndex extends Component {
  constructor(props) {
    super(props);
    this.renderPosts = this.renderPosts.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  // componentDidMount(){
  //   if (this.props.currentUser.id === this.props.match.params.userId) {
  //     this.props.fetchPosts();
  //   }
  //   debugger
  // }
  //
  // componentWillReceiveProps(nextProps, nextState) {
  //   // if (this.props.currentUser.id !== nextProps.match.params.userId) {
  //   //   this.props.fetchPosts();
  //   // }
  //   debugger
  // }

  deletePost(idx){
    const that = this;
    return () => that.props.deletePost(idx);
  }

  renderPosts() {
    return Object.values(this.props.posts).map( (post, idx) => {
      return (
        <li className="post-list" key={ `${post.id}` }>
          <div className="post-list-container">
            <div className="entire-top-container">
              <div className="post-top-container">
                <div className="post-top-left-container">
                  <div>
                    <img className="post-form-image" src={ this.props.user.image_url }></img>
                  </div>
                  <div className="post-name-container">
                    <div>{ this.props.user.firstName }</div>
                    <div>{ moment(post.created_at).format("LL").slice(0, 10) }</div>
                  </div>
                </div>
                <button onClick={ this.deletePost(post.id) }>Delete Post</button>
              </div>
            </div>
            <p className="post-list-text">{ post.text }</p>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        { this.renderPosts() }
      </div>
    );
  }
}

export default PostIndex;
