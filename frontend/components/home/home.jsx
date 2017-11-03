import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SessionFormContainer from '../session/session_form_container';
import SignUpFormContainer from '../signup/signup_form_container';

class Home extends Component {
  constructor(props){
    super(props);

  }

  constructorDidMount() {

  }

  render(){
    // debugger
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
                <li><i className="fa fa-users"></i></li>
                <li><i className="fa fa-comments"></i></li>
                <li><i className="fa fa-globe"></i></li>
                <li><i className="fa fa-question-circle"></i></li>
                <li><i className="fa fa-arrow-circle-down"></i></li>
              </ul>
            </div>
          </main>
          <div className="under-construction">
            <img src="http://www.hunter.cuny.edu/onestop/financial-aid-images-new/fa-working-draft-images/under-construction.png"></img>
          </div>
          <button><Link to='/' onClick={ this.props.logout }>Logout</Link></button>
        </div>
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
