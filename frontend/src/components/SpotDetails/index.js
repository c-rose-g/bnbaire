import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { thunkLoadSingleSpot, thunkLoadSpots } from '../../store/allSpots';
import './SpotDetails.css';

function SingleSpot() {
	const { spotId } = useParams();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots.singleSpot);
	const userSelector = useSelector((state) => state.session.user);

	let spotUpdateButton;
	if(userSelector && userSelector.id === spot.ownerId){
		spotUpdateButton = <NavLink to={`/my-spots/update/${spotId}`}>
									<button>Update Spot</button>
								</NavLink>
	}

	console.log('this is spot in SingleSpot', spot)

	// console.log('this is the spot id', spotId);
	// const spot = spotsSelector.find((spot) => spot.id === +spotId);
	useEffect(() => {

		dispatch(thunkLoadSingleSpot(spotId));
		console.log('this is state inSingleSpot', spot)
	}, [dispatch]);
	// should this be a validation error or optional chaining?
	// what to do when its loading stuff from the thunk?
	// added chaining in the return
	if(!spot?.id) {
		return <div className='not loaded'> NOT LOADED</div>;
	}
	return (
		// <NavLink to='/spots/update-spot'></NavLink>
		<div id="current-spot-container">

			<h1>
        {spot.name}
      </h1>

				<div className="spot-card">
					<div className="img-card">
						{spot.SpotImages && spot.SpotImages.length && <img src={spot.SpotImages[0].url} alt='preview'></img>}
					</div>
					<div className="spot-text">
						<div className="top-spot-text">
							<h2>
								{spot.city}, {spot.state}
							</h2>
							<h2>★{spot.avgRating}</h2>
						</div>
							<h2>{spot.description}</h2>
						<h2>${spot.price} </h2>
						{spotUpdateButton}
					</div>
				</div>

		</div>

	);
}

export default SingleSpot;