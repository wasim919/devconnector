import React, { useEffect } from 'react';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Dashboard = ({ auth, profile, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [auth]);
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  profile: state.profileReducer,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
