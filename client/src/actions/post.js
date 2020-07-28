import {
  GET_POSTS,
  UPDATE_LIKES,
  POST_ERR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../actions/types';
import axios from 'axios';
import { setAlert } from './alert';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: { msg: 'Post doesnot exist', status: 404 },
    });
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    console.log(id);
    const res = await axios.put(`/api/posts/like/${id}`);
    console.log(res.data);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: { msg: 'Post doesnot exist', status: 404 },
    });
  }
};

export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: { msg: 'Post doesnot exist', status: 404 },
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: { msg: 'Post doesnot exist', status: 404 },
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    console.log(res.data);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: { msg: 'Post doesnot exist', status: 404 },
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(`/api/posts/`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data.post,
    });
    dispatch(setAlert('Post Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: { msg: 'Post doesnot exist', status: 404 },
    });
  }
};

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: { msg: 'Post doesnot exist', status: 404 },
    });
  }
};

export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: { msg: 'Post doesnot exist', status: 404 },
    });
  }
};
