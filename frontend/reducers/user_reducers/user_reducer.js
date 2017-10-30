import React from 'react';
import { merge } from 'lodash';

import { RECEIVE_ALL_USERS, RECEIVE_USER } from '../../actions/user_actions';

const UserReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return action.users;
    case RECEIVE_USER:
      // debugger
      return merge({}, state, { [action.user.id]: action.user });
    default:
      return state;
  }
};

export default UserReducer;
