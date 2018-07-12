import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startIndex: this.props.comments[this.props.postId].length - 3,
      endIndex: this.props.comments[this.props.postId].length
    };
    this.renderComments = this.renderComments.bind(this);
    this.showMoreComments = this.showMoreComments.bind(this);
  }

  showMoreComments() {
    let startIndex;
    if (this.state.startIndex - 3 < 0) {
      startIndex = 0;
    } else {
      startIndex = this.state.startIndex - 3;
    }
    this.setState({
      startIndex
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.comments[nextProps.postId].length >
      this.props.comments[this.props.postId].length
    ) {
      this.setState({
        endIndex: nextProps.comments[this.props.postId].length
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.comments[this.props.postId].length <
      nextProps.comments[nextProps.postId].length
    ) {
      return true;
    } else if (nextState.startIndex < this.state.startIndex) {
      return true;
    }

    return false;
  }

  renderComments() {
    let loadMoreComments =
      this.props.comments[this.props.postId].length &&
      this.state.startIndex > 0 ? (
        <p onClick={this.showMoreComments}>Load More Comments</p>
      ) : (
        ""
      );
    let commentList = this.props.comments[this.props.postId].slice(
      this.state.startIndex,
      this.state.endIndex
    );

    console.log("endLength", this.state.endIndex);

    commentList = commentList.map(comment => {
      return (
        <div key={`${comment.id}`}>
          <div className="post-list">
            <div className="comment-container">
              <img src={comment.user.image} />
              <div className="comment-content">
                <Link
                  className="comment-owner-name"
                  to={`/users/${comment.user.id}`}
                  replace
                >
                  {comment.user.first_name}
                </Link>
                <span>{comment.text}</span>
              </div>
            </div>
          </div>
        </div>
      );
    });

    if (this.props.comments === null && this.props.comments.length > 0) {
      return <div className="loading-spin" />;
    } else {
      return (
        <div>
          {loadMoreComments}
          {commentList}
        </div>
      );
    }
  }

  render() {
    return <div className="list-of-post">{this.renderComments()}</div>;
  }
}

export default CommentList;
