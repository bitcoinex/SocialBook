import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import PostUpdate from "../post/post_update_modal";

class DropDown extends Component {
  state = {
    menuActive: false,
    editClick: false
  };

  handleClickOutside = () => {
    if (!this.state.editClick) {
      this.setState({
        menuActive: false
      });
    }
  };

  toggleMenu = () => {
    let menuState = !this.state.menuActive;
    this.setState({
      menuActive: menuState
    });
  };

  handleDelete = e => {
    e.preventDefault();
    this.props.deleteComment(this.props.comment.id);
  };

  editClick = () => {
    let status = !this.state.editClick;
    this.setState({ editClick: status });
  };

  render() {
    const { user, currentUser, comment, updateComment } = this.props;

    let menu;
    if (this.state.menuActive) {
      menu = (
        <div className="post-dropdown-container">
          <ul className="post-dropdown">
            <div className="post-options">
              <li className="selection-option">
                <PostUpdate
                  editClick={this.editClick}
                  toggleMenu={this.toggleMenu}
                  post={comment}
                  currentUser={currentUser}
                  user={user}
                  updatePost={updateComment}
                />
              </li>
              <li className="selection-option">
                <button onClick={this.handleDelete}>Delete</button>
              </li>
            </div>
          </ul>
        </div>
      );
    } else {
      menu = "";
    }
    return (
      <div id="menu">
        <i className="fa fa-ellipsis-h" onClick={this.toggleMenu} />
        {menu}
      </div>
    );
  }
}

export default onClickOutside(DropDown);
