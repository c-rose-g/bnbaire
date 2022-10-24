// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginFormModal.css';
function LoginForm() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [validationErrors, setValidationErrors] = useState([]);
  const [frontEndErrors, setFrontEndErrors] = useState([])
	const [error, setError] = useState([])

	useEffect(() =>{
		const errors = []
		if(credential.length < 1) errors.push('Please provide a username or email')
		if(password.length < 1) errors.push('Please provide an email.')
		setFrontEndErrors(errors)
	},[credential, password])
	const handleSubmit = (e) => {
		e.preventDefault();
		// setErrors([]);
		const errors = [];

		if(credential.length < 1) errors.push('Please provide a username or email')
		if(password.length < 1) errors.push('Please provide an email.')

		setValidationErrors(errors)
		if(!frontEndErrors.length){
			return dispatch(sessionActions.login({ credential, password })).catch(
				async (res) => {
					const data = await res.json();
					if (data && data.errors) setValidationErrors(data.errors);
				}
			);

		}
	};

	const demoUser = (e) => {
		e.preventDefault();
		setError([]);
		return dispatch(
			sessionActions.login({ credential: 'Demolition', password: 'password' })
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setError(data.errors);
		});
	};
	return (
		<div className="modal-content-login">
			<form onSubmit={handleSubmit}>
				<div className="modal-title">
					<label>Please sign in</label>
				</div>
			{validationErrors.length > 0 && (
					<ul className="errors">
						{validationErrors.map((validate) => (
							<li key={validate}>{validate}</li>
						))}
					</ul>
				)}
				<div className="modal-title">
					<label>
						Username or email
						<input
							placeholder="Username or Email"
							type="text"
							value={credential}
							onChange={(e) => setCredential(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="modal-title">
					<label>
						Password
						<input
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="submit-button">
					<div className='modal-login-button-div'>
						<button className='modal-login-button' type="submit">Log In</button>
					</div>
					<div className='demouser-button-div'>
						<button className='demouser-button' type="submit" onClick={demoUser}>
							Demo User Login
						</button>
					</div>
				</div>
			</form>
			<div >

			</div>
		</div>
	);
}

export default LoginForm;
