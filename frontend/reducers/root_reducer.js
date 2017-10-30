import { combineReducers } from 'redux';
import SessionReducer from './session_reducers/session_reducer';
import PostReducer from './post_reducers/post_reducer';
import UserReducer from './user_reducers/user_reducer';
import ErrorsReducer from './errors_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  errors: ErrorsReducer,
  posts: PostReducer,
  users: UserReducer
});

export default RootReducer;
