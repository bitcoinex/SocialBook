import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { merge } from 'lodash';
import PostFormContainer from '../post/post_form_container';
import PostIndexContainer from '../post/post_index_container';
import ProfileTopSection from './profile_top_section';
import ProfileTopContainer from "./profile_top_container";
import Friends from './friends';
import Intro from './intro';
import ProfileNav from './profile_nav';
import ProfileNavContainer from './profile_nav_container';
import FriendsContainer from './friends_container';

class Profile extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
    this.props.fetchUser(this.props.match.params.userId);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.match.params.userId !== this.props.match.params.userId) {
      this.props.fetchUser(nextProps.match.params.userId);
    }
  }

  render(){
    if (this.props.user) {
      return(
        <div>
          <ProfileNavContainer props={ this.props } />
          <ProfileTopContainer props={ this.props } />
          <div className="profile-page-container" >
            <div className="profile-left-section">
              <Intro />
              <FriendsContainer />
            </div>
            <div className="posts-container">
              <PostFormContainer props={ this.props} user={ this.props.user }/>
              <PostIndexContainer />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

export default Profile;
