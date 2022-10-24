import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { thunkLoadSpotsByUser } from '../../store/allSpots';
import './SpotsByUser.css';

function SpotsByUser() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	// console.log('this is user in SpotsByUser comp',userId)
	const spots = useSelector((state) => Object.values(state.spots.allSpots));
	console.log('this is spots USESELECTOR in SpotByUser comp', spots);
	// const spots = useSelector(state => state.session.allSpots)
	// console.log('spots in spot details',spots)
	// const manageSpots = (e) =>{
	//   e.preventDefault();

	//   dispatch(thunkLoadSpotsByUser())

	// }
	useEffect(() => {
		dispatch(thunkLoadSpotsByUser());
	}, [dispatch]);

	if (!user) {
		return <Redirect to="/" />;
	}
	// if(!spots?.id){
	//   return null;
	// }
	if (spots.length < 1) {
		return (
			<>
				<h1 className="no-spots-message">you have no spots</h1>
			</>
		);
	}
	return (
		<div className="userspots-container">
			{spots.map((spot) => {
				return (
					<div className="userspots-card-container" key={spot.name}>
						<NavLink to={`/spots/${spot.id}`}>
							<div className="upper-half-spot-card">
								<div className="img-card">
									<img src={spot?.previewImage} alt="spot image"></img>
								</div>
							</div>
							<div className="lower-half-spot-card">
								<div className="allspots-location">
											{spot.city}, {spot.state}
								</div>
								<div className="allspots-stars">
								★ {Math.trunc(spot.avgRating * 10) / 10}
								</div>
								<div className="allspots-description">
									{spot.description}
								</div>
								<div className="allspots-price">${spot.price} night</div>
							</div>
						</NavLink>
					</div>
				);
			})}
		</div>
	);
}

export default SpotsByUser;
