import { fetchPosts, deletePost } from '../../actions/post_actions';
import { fetchUser } from '../../actions/user_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostIndex from './post_index';

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    currentUser: state.session.currentUser,
    user: state.users[ownProps.match.params.userId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    deletePost: id => dispatch(deletePost(id)),
    fetchUser: id => dispatch(fetchUser(id))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostIndex));
