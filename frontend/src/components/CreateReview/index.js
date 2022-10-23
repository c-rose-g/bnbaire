import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import {createReviewBySpotId, addReviewImageByReviewId} from '../../store/reviews'
import {thunkLoadSingleSpot} from '../../store/allSpots';
import './CreateReview.css'

function CreateReview(){
  const {spotId} = useParams()
  const dispatch = useDispatch();
	const history = useHistory();
  const [review, setNewReview] = useState('')
  const [stars, setNewStars] = useState('')
  const [validateErrors, setValidateErrors] = useState([]);

  // find the user
  const user = useSelector((state) => state.session);
  // console.log('this is user in CREATE REVIEW', user)
	const spot = useSelector((state) => state.reviews);
  // console.log('spot selector in CREATE REVIEW', spot)
  // find the review just created - move to create review image
  // const findReview = useSelector((state)=> Object.values(state.reviews))
  const addReview = e => setNewReview(e.target.value)
  const addStars = e => setNewStars(e.target.value)

  useEffect(() => {
    dispatch(thunkLoadSingleSpot(spotId));

  }, [dispatch]);

  const [frontEndErrors, setFrontEndErrors] = useState([])
  useEffect(()=>{
    const errors = []
    if(review.length < 1) {errors.push('Please write your review.')}
    if(review.length > 250) {errors.push('Reviews must be less than 250 characters.')}
    if(!stars) {errors.push('please add a star rating.')}
    setFrontEndErrors(errors)
  },[review,stars])
  const submitReview = async e => {
    e.preventDefault();
    let errors = []
    // if(spot.userId !== )
    const payload = {review, stars:+stars}
    if(review.length < 25) {errors.push('Please write your review.')}
    if(review.length > 250) {errors.push('Reviews must be less than 250 characters.')}
    if(!stars) {errors.push('please add a star rating.')}
    setValidateErrors(errors)
    console.log('validate errors', validateErrors)
    if(!frontEndErrors.length){
      console.log('calidate errors', validateErrors.length)
      let reviewForm = {...payload}
      console.log('review payloag', reviewForm)
      let userObj = {id:user.id, firstName:user.firstName, lastName:user.lastName}
      const newReview = await dispatch(createReviewBySpotId(reviewForm, spotId, userObj))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidateErrors(data.errors);
      });
      console.log('this wold send')
      history.push(`/spots/${spotId}`)
    }

    }


  // once review is created, dispatch to add image, then dispatch to spot details
  // extra functionality do it later
  // useEffect(() => {
  //   dispatch(addReviewImageByReviewId(reviewForm.id))
  // },[dispatch])

  return(
    <>
    <div className='review-form-container'>
    <div className='review-form-card'>
    <div className='review-form-title'>
      <h1>add a review</h1>
    </div>
      {/* <div className='review-form-container'> */}
      <div>
        <form className='review-form' onSubmit={submitReview}>
        {validateErrors.length > 0 && (
					<ul className="errors">
						{validateErrors.map((validate) => (
							<li key={validate}>{validate}</li>
						))}
					</ul>
				)}
        <label>
        Review
        </label>
        <div >
        <textarea className='newreview-input'
					type="text"
					placeholder="Please start writing your review here."
					value={review}
					onChange={addReview}
				/>
        </div>
        <label>
        Star rating
        </label>
        <div>
        <input className='newreview-stars'
        type='number'
        value={stars}
        onChange={addStars}
        min='1'
        max='5'
        required
        />
        </div>
        <div className='newreview-button-div'>
        <button className='newreview-button' type='submit'>submit</button>
        </div>
        </form>
      </div>
      {/* </div> */}
      </div>
    </div>
    </>
  )
}

export default CreateReview
