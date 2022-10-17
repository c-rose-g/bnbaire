import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AllSpots.css';
import { thunkLoadSpots } from '../../store/allSpots';
import { NavLink } from 'react-router-dom';
function AllSpots() {
	//  returning spot image, spot name?, price, rating, city/state(location), dates?
	const spotsSelector = useSelector((state) => Object.values(state.allSpots));
  console.log('this is spotsSelector',spotsSelector)
  // const spotsArray = Object.values(spotsSelector);
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(thunkLoadSpots())
  },[dispatch])
	return (
    <div className='please work papa'>
    {spotsSelector.map(spot => {
      return(
        <NavLink key={spot.name} to={`/api/spots/${spot.id}`}>
        <div>
          <img src={spot.previewImage} alt='spot image'></img>
        </div>

        </NavLink>
      )
         })}
    </div>

  )
}

export default AllSpots
