// frontend/src/components/Navigation/index.js
import React, {useEffect, useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpot from '../CreateSpot';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const history = useHistory()
	const sessionUser = useSelector((state) => state.session.user);
	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<>
				<LoginFormModal />
				<SignupFormModal />

			</>
		);
	}


	const handleSubmit = (e) =>{
		e.preventDefault();
		if(sessionUser){
			history.push('/create-spot')
		}else {
			alert('Please sign in to become a host')
			// return(<button className='test'>teset</button>)
		}
	}
	return (
		<>
		<div id='navLinks'>

				<NavLink exact to="/">

          <div id='logo'>
          </div>
        </NavLink>
				{isLoaded && sessionLinks}
				<NavLink to='/create-spot'>

					<button onClick={handleSubmit}>
					Become a host!
					</button>

				</NavLink>

    </div>
				<hr className='line' />
		</>
	);
}

export default Navigation;
