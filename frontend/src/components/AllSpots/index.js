import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadSpots } from '../../store/allSpots';
import { NavLink, useParams } from 'react-router-dom';
import './AllSpots.css';
function AllSpots() {
	//  returning spot image, spot name?, price, rating, city/state(location), dates?
	const spotsSelector = useSelector((state) => Object.values(state.spots.allSpots));
	const [pagenotfound, setpagenotfound] = useState({})
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
		dispatch(thunkLoadSpots()).catch(async res =>{
			const data = await res.json()
			console.log('datam', data)
			if(data && data.message){
				setpagenotfound(data.message)
			}
		});
	}, [dispatch]);

	// const starEmoji = (num) => {
	// 	let stars = '';
	// 	for (let i = 0; i < Math.floor(num); i++) {
	// 		stars += '🌟';
	// 	}
	// 	return stars;
	// };
	// console.log('spot images in allSpots comp',spotsSelector)
	return (
		<div className="spots-container">
			{spotsSelector.map((spot) => {
					{/* console.log('each spot',spot.SpotImages)
					let imageArray = spot.SpotImages[0]
					let imageUrl = imageArray.url */}
				return (
					<NavLink key={spot.name} to={`/spots/${spot.id}`}>
						<div className="spot-card" >
							<div className="img-card">
								<img src={spot?.SpotImages[0]?.url} alt="spot image"></img>
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
					</NavLink>
				);
			})}
		</div>
	);
}

export default AllSpots;
