import { combineReducers } from 'redux';
import SessionReducer from './session_reducers/session_reducer';
import PostReducer from './post_reducers/post_reducer';
import ErrorsReducer from './errors_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  errors: ErrorsReducer,
  post: PostReducer
});

export default RootReducer;
