import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AllSpots.css';
import { thunkLoadSpots } from '../../store/allSpots';
import { NavLink } from 'react-router-dom';
function AllSpots() {
	//  returning spot image, spot name?, price, rating, city/state(location), dates?
	const spotsSelector = useSelector((state) => Object.values(state.allSpots));
	console.log('this is spotsSelector', spotsSelector);
	// const spotsArray = Object.values(spotsSelector);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(thunkLoadSpots());
	}, [dispatch]);

  const starEmoji = (num) => {
    let stars= '';
    for(let i = 0; i < Math.floor(num); i++) {
      stars += '🌟'
    }
    return stars
  }
	return (
		<div className="spots-container">
			{spotsSelector.map((spot) => {
				return (
					<NavLink key={spot.name} to={`/api/spots/${spot.id}`}>
						<div className='spot-card'>
            <div className='img-card'>
							<img src={spot.previewImage} alt="spot image"></img>
            </div>
              <div className='spot-text'>
                <h2>{spot.city},{spot.state}</h2>
                <h2> {spot.avgRating} {starEmoji(spot.avgRating) }
                </h2>
                <h2>{spot.price} </h2>
              </div>
						</div>
					</NavLink>
				);
			})}

		</div>
	);
}

export default AllSpots;
