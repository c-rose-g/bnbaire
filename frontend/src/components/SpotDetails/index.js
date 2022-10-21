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
	spotId = parseInt(spotId);
	const history = useHistory();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots.singleSpot);
	let numReviews = spot.numReviews;
	numReviews = parseInt(numReviews)
	// console.log('num reviews', numReviews);
	// console.log('spot selector', spot);
	// console.log('this is spot use selector in SINGLE SPOT', spot)
	const user = useSelector((state) => state.session.user);
	console.log('this is the user SPOT DETAILS', user)
	const reviews = useSelector((state) => Object.values(state.reviews.spot));
	console.log('this is reviews state in SPOT DETAILS', reviews)
	const userReview = reviews.find(id => id.userId === user.id)
	console.log('this is the current user with review in SPOT DETAILS', userReview)
	// let userStarRating = useSelector((state) => state.reviews.spot)
	// console.log('this is userStarRating in SINGLE SPOT', userStarRating);
	// if(reviews.User.id === reviews.userId){
	// 	alert('You have already left a review.')
	// }
	// const [showModal, setShowModal] = useState(false);
	// const openModal = () =>{setShowModal(true)}
	// const warningSubmit = (e) => {e.preventDefault()return (<><DeleteWarningModal /></>)};
	const handleCancel = (e) => {
		e.preventDefault();
		dispatch(deleteSpot(spotId));
		history.push('/');
	};
	let spotUpdateButton;
	let spotDeleteButton;
	useEffect(() => {
		dispatch(thunkLoadSingleSpot(spotId));
		dispatch(loadReviewsBySpotThunk(spotId));
	}, [dispatch]);

	const handleReview = (e) => {
		e.preventDefault();
		if(!user){
			alert('Please sign in to leave a review.')
		}else if(userReview){
			alert('You have already left a review.')
		}else{
			history.push(`/spots/${spotId}/reviews`);
		}
	};
	if (user && user.id === spot.ownerId) {
		spotUpdateButton = (
			<NavLink to={`/my-spots/update/${spotId}`}>
				<button>Update Spot</button>
			</NavLink>
		);
	}

	// if (!spot?.id) {
	// 	return null;
	// }
	function starsWord(num){
		if (num === 0) return 'stars';
		if (num === 1) return 'star';
		if (num > 1) return 'stars';
	}
	function reviewsWord(num) {

		if (num === 0) return 'reviews';
		if (num === 1) return 'review';
		if (num > 1) return 'reviews';
	}

	return (
		<div className="spots-container">
			<div className="page-container">
				<div id="current-spot-container">
					<h1 className="text">{spot.name}</h1>
					<hr className="subline" />
					<div className="subtext">
						★ {spot.avgStarRating} • {spot.numReviews} {reviewsWord(numReviews)} • {spot.city}, {spot.state}
					</div>
					<div className="spot-card">
						<div className="img-card">
							{spot.SpotImages && spot.SpotImages.length && (
								<img src={spot.SpotImages[0].url} alt="preview"></img>
							)}
						</div>
						<div className='text'>
						<h4 className='subtext'>
						Entire condo hosted by the freeway
						</h4>
						<div className='subtext'>
						4 guests • 1 bedroom • 2 beds • 1 bath
						<hr className="subline" />
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
									<b>

									{review.User.firstName} says: </b> <span>{review.stars} stars</span>


									</div>
									<p />
									"{review.review}"
									<hr className="subline" />
								</div>
							);
						})}
						<div className="review-container">
							<button onClick={handleReview}> submit review</button>
						</div>
					</div>
				</div>

						{spotUpdateButton} {spotDeleteButton}
					</div>
				</div>

			</div>
			<fieldset className='side-panel'>
				<div className="spot-text">
				<p/>
					{/* <div className="top-spot-text"> */}
					<div className='text'><b>${spot.price}</b><span className='subtext'>night</span>
					<p/>
					</div>
					<div className='subtext'>
						{/* <h2> */}
							{spot.city}, {spot.state}
							<p/>
						{/* </h2> */}
					</div>
					<div>
						<span className='subtext'> ★ {spot.avgStarRating}</span> • <span className='subtext'>{spot.numReviews} {reviewsWord(numReviews)}</span>
						<p/>
					</div>
					{/* </div> */}
					<div className='spot-text'>What this place offers:</div>
					<p/>
					<div className='subtext'>{spot.description}</div>

				</div>
			</fieldset>
		</div>
	);
}

export default SingleSpot;
