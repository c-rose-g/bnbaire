// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
// import UpdateSpot from "../UpdateSpot";
import {thunkLoadSpotsByUser} from '../../store/allSpots'
import './Navigation.css'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // console.log('this is the user in profile button',user)
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

{/* <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
          <NavLink to='/my-spots/current'>
            <button > Manage your spots</button>
          </NavLink>
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul> */}

  return (
    <>
    <div id='top-nav-buttons'>

      <button className='chimney' onClick={openMenu}>
        <i className="fa-solid fa-house-chimney-user" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <li className="profile-user"> Hello, {user.username}</li>
          <li className="profile-user">Email: {user.email}</li>
          <li>
          <NavLink to='/my-spots/current'>
          <div className="manage-spots-button-div">
            <button className="manage-spots-button" > Manage your spots</button>
          </div>
          </NavLink>
          </li>
          <li>
          <div>
          <div className="logout-button-div">
            <button className="logout-button" onClick={logout}>Log Out</button>
          </div>
          </div>
          </li>
        </div>
      )}
    </div>
    </>
  );
}

export default ProfileButton;
