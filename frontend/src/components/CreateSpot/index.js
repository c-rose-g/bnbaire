import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { createSingleSpot, thunkLoadSingleSpot } from '../../store/allSpots';
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
	// const validatePrice = new RegExp('^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$')
	useEffect(() => {
		const errors = [];
		if (name.length < 4) {
			errors.push('name must be between 4 and 50 characters.');
		}
		if (name.length > 50) {
			errors.push('spot name must 50 characters max.');
		}
		if (name.endsWith('png') || name.endsWith('jpg')) {
			errors.push('name cannot be an image.');
		}
		if (address.length < 4) {
			errors.push('address cannot be less than 4 characters.');
		}
		if (address.endsWith('png') || address.endsWith('jpg')) {
			errors.push('address cannot be an image.');
		}
		if (address.length > 255) {
			errors.push('address must be less than 255 characters.');
		}
		if (city.length < 4) {
			errors.push('city cannot be less than 4 characters.');
		}
		if (city.length > 85) {
			errors.push('city must be less than 85 characters.');
		}
		if (city.endsWith('png') || city.endsWith('jpg')) {
			errors.push('city cannot be an image.');
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
		if (country.length < 3) {
			errors.push('country initials cannot be less than 3 characters.');
		}
		if (country.length > 3) {
			errors.push('please use country initials only.');
		}
		if(country.includes('.')){
			errors.push('please do not include abbreviations in country initials.')
		}
		if (country.endsWith('png') || country.endsWith('jpg')) {
			errors.push('country cannot be an image.');
		}
		if (description.length < 10) {
			errors.push('description cannot be less than 10 characters');
		}
		if (description.length > 255) {
			errors.push('description must be less than 255 characters.');
		}
		if (description.endsWith('png') || description.endsWith('jpg')) {
			errors.push('description cannot be an image.');
		}

		if (description.length > 255) {
			errors.push('description must be less than 255 characters.');
		}
		if (price < 10) {
			errors.push('price cannot be less than 10.');
		}
		if(price.includes('$')){
			errors.push('please use numbers without the dollar sign.')
		}
		if (isNaN(price)) {
			errors.push('price must be a number.');
		}
		if (price > 999) {
			errors.push('price must be less than 1000.');
		}

		if (!url.endsWith('png') && !url.endsWith('jpg')) {
			errors.push('image needs to end with .jpg or .png.');
		}

		setFrontEndErrors(errors);
	}, [address, city, url, state, country, description, name]);

	if (!userSelector) return <Redirect to="/" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = [];
		if (name.length < 4) {
			errors.push('name must be between 4 and 50 characters.');
		}
		if (name.length > 50) {
			errors.push('spot name must 50 characters max.');
		}
		if (name.endsWith('png') || name.endsWith('jpg')) {
			errors.push('name cannot be an image.');
		}
		if (address.length < 4) {
			errors.push('address cannot be less than 4 characters.');
		}
		if (address.endsWith('png') || address.endsWith('jpg')) {
			errors.push('address cannot be an image.');
		}
		if (address.length > 255) {
			errors.push('address must be less than 255 characters.');
		}
		if (city.length < 4) {
			errors.push('city cannot be less than 4 characters.');
		}
		if (city.length > 85) {
			errors.push('city must be less than 85 characters.');
		}
		if (city.endsWith('png') || city.endsWith('jpg')) {
			errors.push('city cannot be an image.');
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
		if (country.length < 3) {
			errors.push('country initials cannot be less than 3 characters.');
		}
		if (country.length > 3) {
			errors.push('please use country initials only.');
		}
		if(country.includes('.')){
			errors.push('please do not include abbreviations in country initials.')
		}
		if (country.endsWith('png') || country.endsWith('jpg')) {
			errors.push('country cannot be an image.');
		}
		if (description.length < 10) {
			errors.push('description cannot be less than 10 characters');
		}
		if (description.length > 255) {
			errors.push('description must be less than 255 characters.');
		}
		if (description.endsWith('png') || description.endsWith('jpg')) {
			errors.push('description cannot be an image.');
		}

		if (description.length > 255) {
			errors.push('description must be less than 255 characters.');
		}
		if (price < 10) {
			errors.push('price cannot be less than 10.');
		}
		if(price.includes('$')){
			errors.push('please use numbers without the dollar sign.')
		}
		if (isNaN(price)) {
			errors.push('price must be a number.');
		}
		if (price > 999) {
			errors.push('price must be less than 1000.');
		}

		if (!url.endsWith('png') && !url.endsWith('jpg')) {
			errors.push('image needs to end with .jpg or .png.');
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
			dispatch(thunkLoadSingleSpot(newSpot.id))
			history.push(`/spots/${newSpot.id}`);
		}
	};
	return (
		<div className="newspot-form-container">
			<div className="newspot-form-card">
				<div>
					<h1 className="newspot-title">Open your door to hosting</h1>
				</div>
				<form className="newspot-form" onSubmit={handleSubmit}>
					{validationErrors.length > 0 && (
						<ul className="errors">
							{validationErrors.map((validate) => (
								<li key={validate}>{validate}</li>
							))}
						</ul>
					)}
					<label>
						<div className="newspot-input-names">Name</div>
						<input
							className="newspot-input"
							type="text"
							placeholder="Name"
							value={name}
							onChange={updateName}
							required
						/>
					</label>
					<label>
						<div className="newspot-input-names">Price</div>
						<input
							className="newspot-input"
							type="text"
							placeholder="Price"
							value={price}
							onChange={updatePrice}
							required
						/>
					</label>
					<label>
						<div className="newspot-input-names">Address</div>
						<input
							className="newspot-input"
							type="text"
							placeholder="Address"
							value={address}
							onChange={updateAddress}
							required
						/>
					</label>
					<label>
						<div className="newspot-input-names">City</div>
						<input
							className="newspot-input"
							type="text"
							placeholder="City"
							value={city}
							onChange={updateCity}
							required
						/>
					</label>
					<label>
						State
						<input
							className="newspot-input"
							type="text"
							placeholder="State"
							value={state}
							onChange={updateState}
							required
						/>
					</label>
					<label>
						<div className="newspot-input-names">Country</div>
						<input
							className="newspot-input"
							type="text"
							placeholder="Country"
							value={country}
							onChange={updateCountry}
							required
						/>
					</label>
					<label>
						<div className="newspot-input-names">Description</div>
						<input
							className="newspot-input"
							type="text"
							placeholder="Description"
							value={description}
							onChange={updateDescription}
							required
						/>
					</label>
					<label>
						<div className="newspot-input-names">Image URL</div>
						<input
							className="newspot-input"
							type="text"
							placeholder="Image URL"
							value={url}
							onChange={updateUrl}
							required
						/>
					</label>
					<label className="newspot-button-label">
						<button className="newspot-button" type="submit">
							Create a new spot
						</button>
					</label>
				</form>
			</div>
		</div>
	);
}

export default CreateSpot;
