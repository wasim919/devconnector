import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { removeComment } from '../../actions/post';
import PropTypes from 'prop-types';

const CommentItem = ({
  auth,
  postId,
  comment: { _id, text, name, avatar, user, date },
  removeComment,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to='/profile'>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
        {!auth.loading && auth.user._id === user && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={(e) => removeComment(postId, _id)}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  removeComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { removeComment })(CommentItem);
