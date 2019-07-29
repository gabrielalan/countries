import React from 'react';
import { connect } from "react-redux";
import Navbar from '../presentational/layout/Navbar';

function Header({ loggedInUser, logOut }) {
  return <Navbar>
    <button className="btn btn--default--outline btn--prefixed" onClick={logOut}>
      <img className="btn--prefixed__picture" src={`/images/${loggedInUser.avatar}`} alt={loggedInUser.username} />
      log out
    </button>
  </Navbar>;
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch({ type: 'USER_LOGOUT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);