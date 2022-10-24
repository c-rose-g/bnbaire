import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadSpots } from '../../store/allSpots';
import { NavLink, useParams } from 'react-router-dom';
import './AllSpots.css';
function AllSpots() {
	//  returning spot image, spot name?, price, rating, city/state(location), dates?
	const spotsSelector = useSelector((state) =>
		Object.values(state.spots.allSpots)
	);
	// const [pagenotfound, setpagenotfound] = useState({})
	// const imageSelector = useSelector(state => Object.values(state.spots.allSpots.SpotImages))
	// console.log('this is image selector',imageSelector)
	// const {spotsSelector.id} = useParams()
	// const spotId = spotsSelector.find()
	// console.log('this is spotsSelector', spotsSelector);
	// find id
	// const spotId = spotsSelector.find(spot => spot.id === +)
	// const spotsArray = Object.values(spotsSelector);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(thunkLoadSpots());
		// .catch(async res =>{
		// 	const data = await res.json()
		// 	console.log('datam', data)
		// 	if(data && data.message){
		// 		setpagenotfound(data.message)
		// 	}
		// });
	}, [dispatch]);
	for (let i = 0; i < spotsSelector.length; i++) {
		const avgRating = Math.trunc(spotsSelector[i].avgRating * 10) / 10;
		if (Number.isNaN(avgRating) || avgRating === 0) {
			spotsSelector[i].avgRating = 'new';
		} else {
			spotsSelector[i].avgRating = avgRating;
		}
	}
	return (
		<div className="spots-container">
			{spotsSelector.map((spot) => {
				return (
					<div className="spot-card-container" key={spot.name}>
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
									{/* {spot && spot.avgRating === 0} */}★ {spot.avgRating}
								</div>
								<div className="allspots-description">{spot.description}</div>
								<div className="allspots-price">${spot.price} night</div>
							</div>
						</NavLink>
					</div>
				);
			})}
		</div>
	);
}

export default AllSpots;
