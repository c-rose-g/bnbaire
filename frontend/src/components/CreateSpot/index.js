import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { createSingleSpot, thunkCreateSpotImage, thunkLoadSpots } from '../../store/allSpots';
import './CreateSpot.css';

function CreateSpot() {
	// address, city, state, country, lat, lng, name, description, price
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
	const [image, setImage] = useState('');
	const userSelector = useSelector((state) => state.session.user);


	const updateAddress = (e) => setAddress(e.target.value);
	const updateName = (e) => setName(e.target.value);
	const updateCity = (e) => setCity(e.target.value);
	const updateState = (e) => setState(e.target.value);
	const updateCountry = (e) => setCountry(e.target.value);
	const updateDescription = (e) => setDescription(e.target.value);
	const updatePrice = (e) => setPrice(e.target.value);
	const updateLAT = (e) => setLAT(e.target.value);
	const updateLNG = (e) => setLNG(e.target.value);
	const updateImage = (e) => setImage(e.target.value);


	useEffect(() => {
    dispatch(thunkLoadSpots());
	}, [dispatch]);

  if(!userSelector) return(
    <Redirect to='/' />
  )

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
			image
		};
    console.log('this is the payload',payload)
		let spotForm = { ...payload };

		const newSpot = await dispatch(createSingleSpot(spotForm));
		const arr = {id: newSpot.id, image}
		const newImage = await dispatch(thunkCreateSpotImage(arr))
		history.push(`/spots/${newSpot.id}`);
	};
	return (
		<div className="spot-form-container">
			{/* add error vaidation message */}
			<h2>Become a host</h2>
			<form onSubmit={handleSubmit}>
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
					inputMode="decimal"
					placeholder="Latitude"
					min='-90'
					max='90'
					value={lat}
					onChange={updateLAT}
				/>
				<input
					inputMode="decimal"
					placeholder="Longitude"
					min='-180'
					max='180'
					value={lng}
					onChange={updateLNG}
				/>
				<input
					type="text"
					placeholder="Image URL"
					value={image}
					onChange={updateImage}
				/>
				<button type="submit">Create a new spot</button>
			</form>
		</div>
	);
}

export default CreateSpot;
