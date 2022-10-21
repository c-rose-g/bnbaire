import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { deleteSpot, thunkLoadSingleSpot } from '../../store/allSpots';
import { loadReviewsBySpotThunk } from '../../store/reviews';
import './SpotDetails.css';
// import DeleteWarningModal from '../DeleteSpotModal';
// import { Modal } from '../../context/Modal';
// import '../DeleteSpotModal/DeleteSpotModal.css';

function SingleSpot() {
	let { spotId } = useParams();
	spotId = parseInt(spotId)
	console.log('spot Id' ,spotId)

	const history = useHistory();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots.singleSpot);
	// console.log('spot selector', spot)
	// console.log('this is spot use selector in SINGLE SPOT', spot)
	const userSelector = useSelector((state) => state.session.user);
	const reviews = useSelector((state) => Object.values(state.reviews.spot));
	console.log('this is reviews state in SINGLE SPOT', reviews)
	// if(reviews.User.id === reviews.userId){
	// 	alert('You have already left a review.')
	// }
	// const [showModal, setShowModal] = useState(false);
	// const openModal = () =>{setShowModal(true)}
	// const warningSubmit = (e) => {e.preventDefault()return (<><DeleteWarningModal /></>)};
	const handleCancel = (e) =>{
		e.preventDefault()
		dispatch(deleteSpot(spotId))
		history.push('/')
	}
	let spotUpdateButton;
	let spotDeleteButton;
	useEffect(() => {
		dispatch(thunkLoadSingleSpot(spotId));
		dispatch(loadReviewsBySpotThunk(spotId));
	}, [dispatch]);


	const handleReview = (e) => {
		e.preventDefault();

		history.push(`/spots/${spotId}/reviews`)
	};
	// if (userSelector && userSelector.id === spot.ownerId) {
	// 	spotUpdateButton = (
	// 		<NavLink to={`/my-spots/update/${spotId}`}>
	// 			<button>Update Spot</button>
	// 		</NavLink>
	// 	);
	// 	spotDeleteButton = <button onClick={handleCancel}>Delete a spot</button>;
	// }
	// if (userSelector && spot.ownerId === null) {

	// 	history.push('/');
	// }

	// if (!spot?.id) {
	// 	return null;
	// }

	return (

		<div className='spots-container'>

		<div className='page-container'>
		<div id="current-spot-container">
			<h1>{spot.name}</h1>
			<div className="spot-card">
				<div className="img-card">
					{spot.SpotImages && spot.SpotImages.length && (
						<img src={spot.SpotImages[0].url} alt="preview"></img>
					)}
				</div>
				{/* <div className="spot-text">
					<div className="top-spot-text">
						<h2>
							{spot.city}, {spot.state}
						</h2>
						<h2>★{spot.avgRating}</h2>
					</div>
					<h2>{spot.description}</h2>
					<h2>${spot.price} </h2>
				</div> */}
						{spotUpdateButton}
						{spotDeleteButton}
					</div>
					</div>
					<div className="reviews-container">
						<div className="reviews-card">
							{/* <h2> this is where the reviews will go</h2> */}
							{/* {reviews.length < 0 && ('this spot has no reviews')} */}
							{reviews.map((review) => {
								return (
									<div className="review-card" key={review.id}>
										<div className="review-user-stars">
											{review.User.firstName}
											{review.stars} stars
										</div>
										<p />
										{review.review}
									</div>
								);
							})}
							<div className='review-container'>
							<button onClick={handleReview}> submit review</button>
							</div>
						</div>
					</div>
				</div>
				<fieldset>
					<div className="spot-text">
						<div className="top-spot-text">
							<h2>
								{spot.city}, {spot.state}
							</h2>
							<h2>★{spot.avgRating}</h2>
						</div>
						<h2>{spot.description}</h2>
						<h2>${spot.price} </h2>
					</div>
				</fieldset>
			</div>
	)
}


export default SingleSpot;
