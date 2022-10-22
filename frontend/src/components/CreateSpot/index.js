import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { createSingleSpot } from '../../store/allSpots';
import './CreateSpot.css';

function CreateSpot() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');

	const [url, seturl] = useState('');
	const [validationErrors, setValidationErrors] = useState([]);
	const [frontEndErrors, setFrontEndErrors] = useState([]);

	const userSelector = useSelector((state) => state.session.user);

	const updateAddress = (e) => setAddress(e.target.value);
	const updateName = (e) => setName(e.target.value);
	const updateCity = (e) => setCity(e.target.value);
	const updateState = (e) => setState(e.target.value);
	const updateCountry = (e) => setCountry(e.target.value);
	const updateDescription = (e) => setDescription(e.target.value);
	const updatePrice = (e) => setPrice(e.target.value);

	const updateUrl = (e) => seturl(e.target.value);

	useEffect(() => {
		const errors = [];
		if (address.length < 1) errors.push('please provide an address.');
		if (city.length < 1) errors.push('please provide the city.');
		if (url.length < 1) errors.push('please provide image url.');
		if (state.length < 1) errors.push('please provide state initials.');
		if (state.length !== 2) errors.push('please only use state initials.');
		if (country.length < 1) errors.push('please provide the country.');
		if (description.length < 1) errors.push('please provide description');
		if (description.length > 250)
			errors.push('description must be less than 255 characters.');
		if (price < 1) errors.push('please provide a price.');
		if(isNaN(price)) errors.push('price must be a number.')
		if (!url.endsWith('png') && !url.endsWith('jpg'))
			errors.push('image needs to end with .jpg or .png.');
		if (name.length < 1) errors.push('please provide a name for the spot.');
		if (name.length > 50) errors.push('spot name must 50 characters max.');
		setFrontEndErrors(errors);
	}, [address, city, url, state, country, description, name]);

	if (!userSelector) return <Redirect to="/" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = [];

		if (address.length < 1) {
			errors.push('please provide an address.');
		}
		if (city.length < 1) {
			errors.push('please provide the city.');
		}
		if (url.length < 1) {
			errors.push('please provide image url.');
		}
		if (state.length < 1) {
			errors.push('please provide state initials.');
		}
		if (state.length !== 2) {
			errors.push('please only use state initials.');
		}
		if (country.length < 1) {
			errors.push('please provide the country.');
		}
		if (description.length < 1) {
			errors.push('please provide description');
		}
		if (description.length > 250){

			errors.push('description must be less than 255 characters.');
		}

		if (price < 1) errors.push('please provide a price.');
		if(isNaN(price)) errors.push('price must be a number.')
		if (!url.endsWith('png') && !url.endsWith('jpg')) {
			errors.push('image needs to end with .jpg or .png.');
		}
		if (name.length < 1) {
			errors.push('please provide a name for the spot.');
		}
		if (name.length > 50) {
			errors.push('spot name must 50 characters max.');
		}
		setValidationErrors(errors);
		if (!frontEndErrors.length) {
			const payload = {
				address,
				city,
				state,
				country,
				name,
				description,
				price,
				url,
				SpotImages: [{ url }],
			};

			let spotForm = { ...payload };

			const newSpot = await dispatch(createSingleSpot(spotForm)).catch(
				async (res) => {
					const data = await res.json();
					console.log('this is data in single spot', data);

					if (data && data.errors) setValidationErrors(data.errors);
				}
			);
			history.push(`/spots/${newSpot.id}`);
		}
	};
	return (
		<div className="spot-form-container">
			<h2 className="text">Open your door to hosting</h2>
			<form onSubmit={handleSubmit}>
				{validationErrors.length > 0 && (
					<ul className="errors">
						{validationErrors.map((validate) => (
							<li key={validate}>{validate}</li>
						))}
					</ul>
				)}
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={updateName}
				/>
				<input
					type="text"
					placeholder="Price"
					value={price}
					onChange={updatePrice}
				/>
				<input
					type="text"
					placeholder="Address"
					value={address}
					onChange={updateAddress}
				/>
				<input
					type="text"
					placeholder="City"
					value={city}
					onChange={updateCity}
				/>
				<input
					type="text"
					placeholder="State"
					value={state}
					onChange={updateState}
				/>
				<input
					type="text"
					placeholder="Country"
					value={country}
					onChange={updateCountry}
				/>
				<input
					type="text"
					placeholder="Description"
					value={description}
					onChange={updateDescription}
				/>

				<input
					type="text"
					placeholder="Image URL"
					value={url}
					onChange={updateUrl}
				/>
				<button type="submit">Create a new spot</button>
			</form>
		</div>
	);
}

export default CreateSpot;
