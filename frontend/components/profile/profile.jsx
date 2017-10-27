import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props){
    super(props);

  }

  render(){
    console.log(this.props.currentUser);
    if (this.props.currentUser) {
      return(
        <div className="profile-page-top">
          <main className="newsfeed-nav-container">
            <div className="newsfeed-nav-items">
              <h1 className="logo"><Link to="/"><i className="fa fa-facebook-official"></i></Link></h1>
              <ul className="navbar-items">
                <li>
                  <img className="nav-profile-image" src={ this.props.currentUser.image_url }></img>
                  <Link to={`/users/${ this.props.currentUser.id}` }>{ this.props.currentUser.firstName }</Link>
                </li>
                <li>Home</li>
                <li><i className="fa fa-users"></i></li>
                <li><i className="fa fa-comments"></i></li>
                <li><i className="fa fa-globe"></i></li>
                <li><i className="fa fa-question-circle"></i></li>
                <li><i className="fa fa-arrow-circle-down"></i></li>
              </ul>
            </div>
          </main>
          <div className="top-profile-portion">
            <img className="profile-cover-image" src={ this.props.currentUser.cover_image_url }></img>
            <img className="profile-image" src={ this.props.currentUser.image_url }></img>
          </div>
          <button onClick={ this.props.logout }>Logout</button>
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
