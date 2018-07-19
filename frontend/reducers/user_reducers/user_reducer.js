import React from "react";
import { merge, omit } from "lodash";

import {
  RECEIVE_ALL_USERS,
  RECEIVE_USER,
  RECEIVE_NEWSFEED
} from "../../actions/user_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";
import {
  RECEIVE_FRIEND,
  REMOVE_FRIEND,
  UPDATE_FRIEND
} from "../../actions/friend_actions";
import { REMOVE_POST, RECEIVE_POST } from "../../actions/post_actions";
import { RECEIVE_LIKE, REMOVE_LIKE } from "../../actions/like_actions";
import { RECEIVE_COMMENT } from "../../actions/comment_actions";

const UserReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return action.users;
    case RECEIVE_NEWSFEED:
      return merge({}, state, { newsfeed: action.posts.newsfeed });
    case RECEIVE_USER:
      newState = merge({}, state, { [action.user.id]: action.user });
      newState.friends = action.friends || {};
      return newState;
    case RECEIVE_POST:
      if (state.newsfeed === undefined) {
        newState = merge({}, state);
      } else {
        newState = merge({}, state);
        newState.newsfeed.unshift(action.post);
      }
      return newState;
    case RECEIVE_COMMENT:
      debugger;
      newState = merge({}, state);
      if (newState.newsfeed) {
        for (let i = 0; i < newState.newsfeed.length; i++) {
          let currentPost = newState.newsfeed[i];
          if (currentPost.id === action.comment.comment.postId) {
            currentPost.comments.push(action.comment.comment);
            break;
          }
        }
      }
      return newState;
    case RECEIVE_LIKE:
      newState = merge({}, state);
      if (newState.newsfeed) {
        for (let i = 0; i < newState.newsfeed.length; i++) {
          let currentPost = newState.newsfeed[i];
          if (currentPost.id === action.like.like.liked_id) {
            currentPost.likes[currentPost.id].array.push(
              action.like.like.liker_id
            );
            break;
          }
        }
      }
      return newState;
    case REMOVE_LIKE:
      newState = merge({}, state);
      if (newState.newsfeed) {
        for (let i = 0; i < newState.newsfeed.length; i++) {
          let currentPost = newState.newsfeed[i];
          if (currentPost.id === action.like.like.liked_id) {
            let likeRemoveIndex = currentPost.likes[
              currentPost.id
            ].array.indexOf(action.like.like.liker_id);

            let newArray = newState.newsfeed[i].likes[
              currentPost.id
            ].array.splice(likeRemoveIndex, 1);

            newState.newsfeed[i].likes[currentPost.id].array.concat(newArray);
          }
        }
      }
      return newState;
    case REMOVE_POST:
      newState = merge({}, state);
      let userIds = Object.keys(newState);
      let key;

      for (let i = 0; i < userIds.length; i++) {
        if (isNaN(userIds[i])) break;
        if (newState[userIds[i]].profilePostsId.includes(action.postId)) {
          key = userIds[i];
          break;
        }
      }
      if (key !== undefined) {
        let location = newState[key].profilePostsId.indexOf(action.postId);
        newState[key].profilePostsId = newState[key].profilePostsId
          .slice(0, location)
          .concat(newState[key].profilePostsId.slice(location + 1));
      }

      if (newState.newsfeed) {
        let newsfeed = newState.newsfeed;
        for (let i = 0; i < newsfeed.length; i++) {
          if (newsfeed[i].id === action.postId) {
            newState.newsfeed = newState.newsfeed
              .slice(0, i)
              .concat(newState.newsfeed.slice(i + 1));
          }
        }
      }

      return newState;
    case RECEIVE_FRIEND:
      let friendee = action.friend.friendee_id;
      newState = merge({}, state);
      newState[friendee].requests.push(action.friend.friender_id);
      return newState;
    case REMOVE_FRIEND:
      let removeFriend;
      let currentUser;
      newState = merge({}, state);

      if (action.friend.type === "friendee") {
        removeFriend = action.friend.removed_friendship.friender_id;
        currentUser = action.friend.removed_friendship.friendee_id;
      } else if (action.friend.type === "friender") {
        removeFriend = action.friend.removed_friendship.friendee_id;
        currentUser = action.friend.removed_friendship.friender_id;
      }
      if (state[currentUser]) {
        let currentUserFriends = state[currentUser].friendIds.filter(id => {
          return id !== removeFriend;
        });
        newState[currentUser].friendIds = currentUserFriends;
      }

      let removedFriend = state[removeFriend].friendIds.filter(id => {
        return id !== currentUser;
      });

      newState[removeFriend].friendIds = removedFriend;

      return newState;

    case UPDATE_FRIEND:
      let requester = action.friend.friender_id;
      newState = merge({}, state);
      newState[action.friend.friendee_id].friendIds.push(requester);
      return newState;
    case RECEIVE_CURRENT_USER:
      if (action.currentUser === null) {
        newState = state;
      } else if (action.currentUser.user) {
        newState = merge({}, state, {
          [action.currentUser.user.id]: action.currentUser.user
        });
      }
      return newState;
    default:
      return state;
  }
};

export default UserReducer;
