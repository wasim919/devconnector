import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Loading, PostItem, PostForm } from '../';
import { getPosts } from '../../actions/post';
import PropTypes from 'prop-types';

const Posts = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome to the community!
          </p>
          <PostForm />
          <div className='posts'>
            {posts.map((post, index) => (
              <PostItem key={index} post={post} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.postReducer,
});

export default connect(mapStateToProps, { getPosts })(Posts);
