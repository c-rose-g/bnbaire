import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import './UpdateSpot.css';
import {
	thunkUpdateSingleSpot,
	thunkLoadSpotsByUser,
} from '../../store/allSpots';
function UpdateSpot() {
	const userSelector = useSelector((state) => state.session.user);

	// console.log('user selector id', userSelector)
	const { spotId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [lat, setLAT] = useState(0);
	const [lng, setLNG] = useState(0);
	const [errors, setErrors] = useState([]);

	const updateAddress = (e) => setAddress(e.target.value);
	const updateName = (e) => setName(e.target.value);
	const updateCity = (e) => setCity(e.target.value);
	const updateState = (e) => setState(e.target.value);
	const updateCountry = (e) => setCountry(e.target.value);
	const updateDescription = (e) => setDescription(e.target.value);
	const updatePrice = (e) => setPrice(e.target.value);
	const updateLAT = (e) => setLAT(e.target.value);
	const updateLNG = (e) => setLNG(e.target.value);

	useEffect(() => {
		dispatch(thunkLoadSpotsByUser());
	}, [dispatch]);
	// prevents a non user from updating the spot
	if (!userSelector) return <Redirect to="/" />;
	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			address,
			city,
			state,
			country,
			name,
			description,
			price,
			lat,
			lng,
		};
		let updateSpotForm = { ...payload };
		// console.log('this is updateSpotForm in UpdateSpot comp', updateSpotForm);
		setErrors([]);
		const updateSpot = await dispatch(
			thunkUpdateSingleSpot(updateSpotForm, spotId)
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
		history.push(`/spots/${spotId}`);
	};
	return (
		<div className='update-page-container'>
		<div className="update-spot-container">
			<div>
				<h2 className='text'> page to update a single spot</h2>
			</div>
			<div className='input'>
				<form onSubmit={handleSubmit}>
					{/* {validationErrors.length > 0 && (
				<ul className="errors">
					{validationErrors.map((validate) => (
						<li key={validate}>{validate}</li>
					))}
				</ul>)} */}
				<div >

					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={updateName}
					/>
				</div>
				<div>

					<input
						type="text"
						placeholder="Price"
						value={price}
						onChange={updatePrice}
					/>
				</div>
				<div>

					<input
						type="text"
						placeholder="Address"
						value={address}
						onChange={updateAddress}
					/>
				</div>
				<div>

					<input
						type="text"
						placeholder="City"
						value={city}
						onChange={updateCity}
					/>
				</div>
				<div>

					<input
						type="text"
						placeholder="State"
						value={state}
						onChange={updateState}
					/>
				</div>
				<div>

					<input
						type="text"
						placeholder="Country"
						value={country}
						onChange={updateCountry}
					/>
				</div>
				<div>

					<input
						type="text"
						placeholder="Description"
						value={description}
						onChange={updateDescription}
					/>
				</div>
				<div>

					<input
						inputMode="decimal"
						placeholder="Latitude"
						min="-90"
						max="90"
						value={lat}
						onChange={updateLAT}
					/>
				</div>
				<div>

					<input
						inputMode="decimal"
						placeholder="Longitude"
						min="-180"
						max="180"
						value={lng}
						onChange={updateLNG}
					/>
				</div>

					<button type="submit">Update spot</button>
				</form>
			</div>
		</div>
		</div>
	);
}
export default UpdateSpot;
