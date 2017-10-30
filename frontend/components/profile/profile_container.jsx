import { logout } from '../../actions/session_actions';
import { fetchUser } from '../../actions/user_actions';
import { connect } from 'react-redux';
import Profile from './profile';
import About from './about';

const mapStateToProps = ({ session, users }, ownProps) => {
  console.log(users);
  console.log(session);
  return {
    currentUser: session.currentUser,
    user: users[ownProps.match.params.userId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchUser: id => dispatch(fetchUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
