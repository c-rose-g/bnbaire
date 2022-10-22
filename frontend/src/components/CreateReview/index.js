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
  const [errors, setErrors] = useState([]);

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

  const submitReview = async e => {
    e.preventDefault();
    // if(spot.userId !== )
    const payload = {review, stars:+stars}

    let reviewForm = {...payload}
    console.log('payload in CREATE REVIEW',reviewForm)
    let userObj = {id:user.id, firstName:user.firstName, lastName:user.lastName}
    const newReview = await dispatch(createReviewBySpotId(reviewForm, spotId, userObj))
    // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) setErrors(data.errors);
      // });

      history.push(`/spots/${spotId}`)

    }


  // once review is created, dispatch to add image, then dispatch to spot details
  // extra functionality do it later
  // useEffect(() => {
  //   dispatch(addReviewImageByReviewId(reviewForm.id))
  // },[dispatch])

  return(
    <>
    <div className='page-container'>
    <div className='title'>
      <h1> add a review</h1>
    </div>
      <div className='review-form-container'>
      <div className='review-form'>
        <form onSubmit={submitReview}>
        <input
					type="textarea"
					placeholder="Review"
					value={review}
					onChange={addReview}
				/>
        <input
        type='number'
        value={stars}
        onChange={addStars}
        min='1'
        max='5'
        />
        <button type='submit'>submit</button>
        </form>
      </div>
      </div>
    </div>
    </>
  )
}

export default CreateReview
