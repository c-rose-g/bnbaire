// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SignupFormModal.css';
function SignupForm() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(
				sessionActions.signup({
					firstName,
					lastName,
					email,
					username,
					password,
				})
			).catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(Object.values(data.errors));
			});
		}
		return setErrors([
			'Confirm Password field must be the same as the Password field',
		]);
	};

	return (
		<div id="signup-modal">
			<form onSubmit={handleSubmit}>
				<div className="modal-title">
					<label className="text">Sign up!</label>
				</div>
			<div className="errors">
			<ul>
					{errors.map((error, idx) => (

						<div key={idx}> <li>{error} </li></div>
					))}
			</ul>
				</div>
				<div className='modal-title'>
					<label>
						First Name
						<input
							type="text"
							placeholder="First name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</label>
				</div>
				<div>
				<div className='modal-title'>

					<label>
						Last Name
						<input
							type="text"
							placeholder="Last Name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</label>
				</div>
				</div>
				<div className='modal-title'>
					<label>
						Email
						<input
							type="text"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className='modal-title'>
					<label>
						Username
						<input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className='modal-title'>
					<label>
						Password
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className='modal-title'>
					<label>
						Confirm Password
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							// required
						/>
					</label>
				</div>
				<div className='signup-modal-button'>
					<button type="submit">Sign Up</button>
				</div>
			</form>

		</div>
	);
}

export default SignupForm;
