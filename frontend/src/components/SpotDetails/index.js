import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { deleteSpot, thunkLoadSingleSpot } from '../../store/allSpots';
import { loadReviewsBySpotThunk } from '../../store/reviews';
import { deleteReview } from '../../store/reviews';
import './SpotDetails.css';
// import DeleteWarningModal from '../DeleteSpotModal';
// import { Modal } from '../../context/Modal';
// import '../DeleteSpotModal/DeleteSpotModal.css';
// const [showModal, setShowModal] = useState(false);
// const openModal = () =>{setShowModal(true)}
// const warningSubmit = (e) => {e.preventDefault()return (<><DeleteWarningModal /></>)};

function SingleSpot() {
	// const [isLoaded, setIsLoaded] = useState(false);
	// console.log('spot selector', spot);
	// console.log('num reviews', numReviews);
	// console.log('this is spot use selector in SINGLE SPOT', spot)
	// console.log('this is the user SPOT DETAILS', user)
	// console.log('this is reviews state in SPOT DETAILS', reviews)
	let { spotId } = useParams();
	spotId = parseInt(spotId);
	const history = useHistory();
	const dispatch = useDispatch();
	const spot = useSelector((state) => state.spots.singleSpot);
	let numReviews = spot.numReviews;
	numReviews = parseInt(numReviews);
	const user = useSelector((state) => state.session.user);
	const reviews = useSelector((state) => Object.values(state.reviews.spot));

	const userReview = user ? reviews.find((id) => id.userId === user.id) : null;
	// console.log('this is the userReview in SPOT DETAILS', userReview)

	const handlDeleteCurrentSpot = () => {
		// e.preventDefault();
		console.log('dispatch delete spot');
		dispatch(deleteSpot(spotId));
		// might have to delete history
		history.push('/');
	};
	const handleDeleteCurrentReview = async () => {
		// e.preventDefault()

		await dispatch(deleteReview(userReview.id));
		// .then(() => setIsLoaded(true))
		// history.push(`/spots/${spotId}`)
	};
	let spotUpdateButton;
	let spotDeleteButton;
	let spotSubmitReviewButton;
	let spotDeleteReviewButton;
	useEffect(() => {
		dispatch(thunkLoadSingleSpot(spotId));
		dispatch(loadReviewsBySpotThunk(spotId));
	}, [dispatch]);

	const handleReview = (e) => {
		e.preventDefault();

		if (user && userReview) {
			alert('You have already left a review.');
		} else {
			history.push(`/spots/${spotId}/reviews`);
		}
	};
	if (user && user.id === spot.ownerId) {
		spotUpdateButton = (
			<NavLink to={`/my-spots/update/${spotId}`}>
				<button className="details-update-spot-button">Update Spot</button>
			</NavLink>
		);
		spotDeleteButton = (
			<>
				<button
					className="details-delete-spot-button"
					onClick={handlDeleteCurrentSpot}
				>
					Delete Spot
				</button>
			</>
		);
	}

	if (user && user.id !== spot.ownerId) {
		spotSubmitReviewButton = (
			<>
				<button className="submit-review-button" onClick={handleReview}>
					Submit a review
				</button>
			</>
		);
		// spotDeleteReviewButton=(<>
		{
			/* <button onClick={handleDeleteCurrentReview}>Delete your review</button> */
		}
		// </>)
	}
	// if(user && user.id === reviews.userReview){
	// spotDeleteReviewButton=(<>
	// 	<button onClick={handleDeleteCurrentReview}>Delete your review</button>
	// </>)
	// }
	function reviewsWord(num) {
		// return (num === 0) ? 'reviews': num === 1 ? : 'reviews' : num > 1 ? :'reviews'
		if (num === 0) return 'reviews';
		if (num === 1) return 'review';
		if (num > 1) return 'reviews';
	}
	// const noReviews = ()=>{
	// 	if(!reviews.spot){
	// 		return ('hello')
	// 	}
	// }
	// let avgRating = Math.trunc(((spot.avgStarRating)* 10))/10
	// let newRating = Number.isNaN(avgRating)? 'new': Math.trunc(((spot.avgStarRating)* 10))/10
	// if(Number.isNaN(avgRating)){
	// 	spot.avgStarRating = 'new'
	// } else {
	// 	spot.avgStarRating = avgRating
	// }

	return (
		<div className="details-spots-container">
			<div className="page-container">
				<div id="current-spot-container">
					<div className="details-spot-card-title">{spot.name}</div>
					<hr className="subline" />
					<div className="subtext">
						★{Math.trunc(spot.avgStarRating * 10) / 10} • {spot.numReviews}{reviewsWord(numReviews)} • {spot.city}, {spot.state}
					</div>
					<div className="spot-card">
						<div className="img-card">
							{spot.SpotImages && spot.SpotImages.length && (
								<img src={spot.SpotImages[0].url} alt="preview"></img>
							)}
						</div>
						<div className="text">
							<h4 className="subtext">Entire condo hosted by the freeway</h4>
							<div className="subtext">
								4 guests • 1 bedroom • 2 beds • 1 bath
								<hr className="subline" />
							</div>
						</div>
						<div className="reviews-container">
							<div className="reviews-card">
								<div className="details-review-title">
									Reviews for {spot.name}
								</div>
								{reviews.map((review) => {
									return (
										<div className="review-card" key={review.id}>
											<div>
												<hr className="subline" />
												<div className="review-user-stars">
													<b>{review.User.firstName} says: </b>{' '}
													<span>{review.stars} stars</span>
												</div>
											</div>
											<p />
											<div>
												{/* '{review.length === 0 && ('this place has no reviews')}' */}
												"{review.review}"
											</div>
											<div className="delete-review-div">
												{user && +user.id === +review.User.id ? (
													<button
														className="delete-review-button"
														onClick={handleDeleteCurrentReview}
													>
														Delete your review
													</button>
												) : null}
											</div>
											{/* <hr className="subline" /> */}
										</div>
									);
								})}
								{/* } */}
								<div className="review-container">
									{/* {spotSubmitReviewButton} */}
									{/* <button onClick={handleReview}> submit review</button> */}
								</div>
							</div>
						</div>
						{/* {spotUpdateButton} <span>{spotDeleteButton}</span> */}
					</div>
				</div>
			</div>
			<fieldset className="side-panel">
				<div className="spot-text">
					<p />
					{/* <div className="top-spot-text"> */}
					<div className="text">
						<b>${spot.price}</b>
						<span className="subtext">night</span>
						<p />
					</div>
					<div className="subtext">
						{/* <h2> */}
						{spot.city}, {spot.state}
						<p />
						{/* </h2> */}
					</div>
					<div>
						<span className="subtext">
							{' '}
							★ {Math.trunc(spot.avgStarRating * 10) / 10}
						</span>{' '}
						•{' '}
						<span className="subtext">
							{spot.numReviews} {reviewsWord(numReviews)}
						</span>
						<p />
					</div>
					{/* </div> */}
					<div className="spot-text">What this place offers:</div>
					<p />
					<div className="subtext">{spot.description}</div>
					<div className="details-update-spot-div">{spotUpdateButton}</div>
					<div className="details-delete-spot-div">{spotDeleteButton}</div>
					<div className="submit-review-div">{spotSubmitReviewButton}</div>
				</div>
			</fieldset>
		</div>
	);
}

export default SingleSpot;
