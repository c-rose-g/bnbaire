import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connectAdvanced } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import './UpdateSpot.css';
import {
	thunkUpdateSingleSpot,
	thunkLoadSpotsByUser,
} from '../../store/allSpots';
function UpdateSpot() {
	const { spotId } = useParams();
	console.log(spotId)

	const userSelector = useSelector((state) => state.session.user);
	let spot = useSelector(state => Object.values(state.spots.allSpots))
	spot = spot[0]
	console.log('spot       ', spot.address)
	// findAddy = spot.find(key => key.id)
	// console.log('user selector id', userSelector)
	const dispatch = useDispatch();
	const history = useHistory();
	const [address, setAddress] = useState(spot.address);
	const [city, setCity] = useState(spot.city);
	const [state, setState] = useState(spot.state);
	const [country, setCountry] = useState(spot.country);
	const [name, setName] = useState(spot.name);
	const [description, setDescription] = useState(spot.description);
	const [price, setPrice] = useState(spot.price);

	const [validateErrors, setValidateErrors] = useState([]);
	const [frontEndErrors, setFrontEndErrors] = useState([]);

	const updateAddress = (e) => setAddress(e.target.value);
	const updateName = (e) => setName(e.target.value);
	const updateCity = (e) => setCity(e.target.value);
	const updateState = (e) => setState(e.target.value);
	const updateCountry = (e) => setCountry(e.target.value);
	const updateDescription = (e) => setDescription(e.target.value);
	const updatePrice = (e) => setPrice(e.target.value);

	useEffect(() => {
		const errors = [];
		if (name.length < 4) {
			errors.push('please provide a name for the spot.');
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
		setFrontEndErrors(errors);
	}, [address, city, state, country, description, name, price]);

	useEffect(() => {
		dispatch(thunkLoadSpotsByUser());
	}, [dispatch]);
	// prevents a non user from updating the spot
	if (!userSelector) return <Redirect to="/" />;
	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = [];
		if (name.length < 4) {
			errors.push('please provide a name for the spot.');
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
		setValidateErrors(errors);

		if (!frontEndErrors.length) {
			const payload = {
				address,
				city,
				state,
				country,
				name,
				description,
				price,
			};
			let updateSpotForm = { ...payload };
			// console.log('this is updateSpotForm in UpdateSpot comp', updateSpotForm);
			// setErrors([]);
			const updateSpot = await dispatch(
				thunkUpdateSingleSpot(updateSpotForm, spotId)
			).catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setValidateErrors(data.errors);
			});
			history.push(`/spots/${spotId}`);
		}
	};
	return (
		<div className="update-spot-form-container">
			<div className="update-spot-card">

					<form className='update-spot-form' onSubmit={handleSubmit}>
				<div >
					<h1 className="update-spot-form-title"> Update your spot's information</h1>
				</div>
						{validateErrors.length > 0 && (
							<ul className="errors">
								{validateErrors.map((validate) => (
									<li key={validate}>{validate}</li>
								))}
							</ul>
						)}
						<label>
						Name
							<input className='update-spot-input'
								type="text"
								placeholder="Name"
								value={name}
								onChange={updateName}
							/>
						</label>
						<label>
						Price
							<input className='update-spot-input'
								type="text"
								placeholder="Price"
								value={price}
								onChange={updatePrice}
							/>
						</label>
						<label>
						Address
							<input className='update-spot-input'
								type="text"
								placeholder="Address"
								value={address}
								onChange={updateAddress}
							/>
						</label>
						<label>
						City
							<input className='update-spot-input'
								type="text"
								placeholder="City"
								value={city}
								onChange={updateCity}
							/>
						</label>
						<label>
						State
							<input className='update-spot-input'
								type="text"
								placeholder="State"
								value={state}
								onChange={updateState}
							/>
						</label>
						<label>
						Country
							<input className='update-spot-input'
								type="text"
								placeholder="Country"
								value={country}
								onChange={updateCountry}
							/>
						</label>
						<label>
						Description
							<input className='update-spot-descrip-input'
								type="text"
								placeholder="Please write your spot's description here"
								value={description}
								onChange={updateDescription}
							/>
						</label>
						<label className='update-spot-button-label'>
						<button className='update-spot-button' type="submit">Update spot</button>
						</label>
					</form>

			</div>
		</div>
	);
}
export default UpdateSpot;
