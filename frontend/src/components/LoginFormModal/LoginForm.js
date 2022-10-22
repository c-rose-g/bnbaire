// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginFormModal.css';
function LoginForm() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			}
		);
	};

	const demoUser = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(
			sessionActions.login({ credential: 'Demolition', password: 'password' })
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};
	return (
		<div className="modal-content-login">
			<form onSubmit={handleSubmit}>
				{/* <ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}
				<div className="modal-title">
					<label>Please sign in</label>
				</div>
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
					<div>
						<button type="submit">Log In</button>
					</div>
					<div>
						<button type="submit" onClick={demoUser}>
							Demo User Login
						</button>
					</div>
				</div>
			</form>
			<div >
				<ul className="errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default LoginForm;
