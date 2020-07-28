import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading, PostItem, CommentForm, CommentItem } from '../';
import { getPost } from '../../actions/post';
import PropTypes from 'prop-types';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    console.log(match.params.id);
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <Loading />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} postId={post._id} comment={comment} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.postReducer,
});

export default connect(mapStateToProps, { getPost })(Post);
