import React, { Component } from 'react';
// import MDSpinner from "react-md-spinner";
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import DropDown from './dropdown';
import SessionFormContainer from '../session/session_form_container';
import SignUpFormContainer from '../signup/signup_form_container';
import ProfileContainer from '../profile/profile_container';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    };
  }
  //
  // componentDidMount() {
  //   this.setState({
  //     redirect: true
  //   });
  // }

  // componentWillReceiveProps(nextProps){
  //   debugger
  //   if (this.props.currentUser === null && nextProps.currentUser !== null) {
  //     // this.props.fetchUser(nextProps.currentUser.id);
  //     this.setState({
  //       redirect: true
  //     });
  //   }
  // }

  render(){
    if (this.props.currentUser) {
      return(
        <div>
          <main className="newsfeed-nav-container">
            <div className="newsfeed-nav-items">
              <h1 className="logo"><Link to="/"><i className="fa fa-facebook-official"></i></Link></h1>
              <ul className="navbar-items">
                <li>
                  <img className="nav-profile-image" src={ this.props.currentUser.image_url }></img>
                  <Link to={`/users/${ this.props.currentUser.id}` }>{ this.props.currentUser.firstName }</Link>
                </li>
                <li>Home</li>
                <li className="hidden-element"><i className="fa fa-users"></i></li>
                <li className="hidden-element"><i className="fa fa-comments"></i></li>
                <li className="hidden-element"><i className="fa fa-globe"></i></li>
                <li className="hidden-element"><i className="fa fa-question-circle"></i></li>
                <li><DropDown logout={ this.props.logout } /></li>
              </ul>
            </div>
          </main>
          <div className="under-construction">
            <div className="under-construction-inner">
              <img src="http://www.hunter.cuny.edu/onestop/financial-aid-images-new/fa-working-draft-images/under-construction.png"></img>
            </div>
          </div>
        </div>
        // <Redirect to={`/users/${this.props.currentUser.id}`} replace />
      );
    } else {
      return (
        <div>
          <SessionFormContainer />
          <SignUpFormContainer />
        </div>
      );
    }
  }
}

export default Home;
