import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { thunkLoadSingleSpot } from '../../store/allSpots';
import './SpotDetails.css';

function SingleSpot() {
	const dispatch = useDispatch();
	const spotsSelector = useSelector((state) => Object.values(state.allSpots));

	const { spotId } = useParams();
	console.log('this is the spot id', spotId);
	const spot = spotsSelector.find((spot) => spot.id === +spotId);
	useEffect(() => {
		dispatch(thunkLoadSingleSpot);
	}, [dispatch]);
	return (
		<div className="spots-container">

			<h1>
        {spot.name}
      </h1>



				<div className="spot-card">
					<div className="img-card">
						<img src={spot.previewImage} alt="spot image"></img>
					</div>
					<div className="spot-text">
						<div className="top-spot-text">
							<h2>
								{spot.city}, {spot.state}
							</h2>
							<h2>★{spot.avgRating}</h2>
						</div>
						<h2>${spot.price} </h2>
					</div>
				</div>

		</div>
	);
}

export default SingleSpot;
