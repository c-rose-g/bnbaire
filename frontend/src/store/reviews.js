import { csrfFetch } from "./csrf";
// TODO define types
const CREATE_REVIEW_BY_SPOT_ID = 'reviews/actionCreateReviewBySpotId'
const ADD_REVIEW_IMAGE_BY_REVIEW_ID = 'reviews/actionAddReviewImageByReviewId'
const LOAD_REVIEWS_BY_USER = 'reviews/actionLoadReviewsByUser'
const LOAD_REVIEWS_BY_SPOT_ID = 'reviews/actionLoadReviewsBySpotId'
const EDIT_REVIEW_BY_REVIEW_REVIEW_ID = 'reviews/actionEditReviewByReviewId'
const DELETE_REVIEW_BY_REVIEW_ID = 'reviews/actionDeleteReviewByReviewId'
// TODO define action creators
export const actionCreateReviewBySpotId = (newReview) =>({
  type: CREATE_REVIEW_BY_SPOT_ID,
  newReview
})
export const actionAddReviewImageByReviewId = (newReview) =>({
  type: ADD_REVIEW_IMAGE_BY_REVIEW_ID,
  newReview
})

// export const actionLoadReviewsByUser = (reviews)=>({
//   type: LOAD_REVIEWS_BY_USER,
//   reviews
// })
export const actionLoadReviewsBySpotId = (reviews) =>({
  type: LOAD_REVIEWS_BY_SPOT_ID,
  reviews
})
export const actionEditReviewByReviewId =(reviews) =>({
  type: EDIT_REVIEW_BY_REVIEW_REVIEW_ID,
  reviews
})
// use id or spot?
export const actionDeleteReviewByReviewId = (id) =>({
  type: DELETE_REVIEW_BY_REVIEW_ID,
  id
})
function normalizeArray(dataArray) {

	if (!(dataArray instanceof Array))
		throw new Error('Normalize problem: data invalid');

	const obj = {};
	dataArray.forEach((el) => {
		obj[el.id] = el;
	});
	return obj;
}
// TODO define thunks
// ****CREATE********************************************************************************************************************
export const createReviewBySpotId = (newReview, spotId, user) => async(dispatch) => {
  const {review, stars} = newReview
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      review, stars
    })
  })
  if(response.ok){
    const data = await response.json()
    data.User = user
    dispatch(actionCreateReviewBySpotId(data))
    return data
  }
}
export const addReviewImageByReviewId = (newReview, url) => async(dispatch) => {
  const response = await csrfFetch(`/api/reviews/${newReview.id}/images`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url:url
    })
  })
  if(response.ok){
    const data = await response.json()
    newReview.ReviewImages = [data]
    dispatch(actionAddReviewImageByReviewId(data))
    return data
  }
}
// ****READ********************************************************************************************************************
// export const loadReviewsByUserThunk = () => async(dispatch) =>{
//   const response = await csrfFetch(`/api/reviews/current`)
//   if(response.ok){
//     const data = await response.json()
//     dispatch(actionLoadReviewsByUser(data))
//     return response
//   }
// }

export const loadReviewsBySpotThunk = (spotId) => async(dispatch) =>{
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
  // console.log('response from review by spot id', response)
  if(response.ok){
    const data = await response.json()
    dispatch(actionLoadReviewsBySpotId(data))
    return response;
  }
}
// ****UPDATE********************************************************************************************************************
export const editReview = (reviews, reviewId) => async(dispatch) =>{
  const {review, stars} = reviews
  const response = await csrfFetch(`/api/reviews/${reviewId}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({review, stars})
  })

  if(response.ok){
    const data = await response.json()
    dispatch(actionEditReviewByReviewId(data))
    return data
  }
}
// ****DELETE********************************************************************************************************************
export const deleteReview = (id) => async(dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`,{
    method:'DELETE'
  })
  if(response.ok){
    const data = await response.json();
    console.log('this is data in thunk', data)
    dispatch(actionDeleteReviewByReviewId(id))
    return data
  }
}
// TODO define reducer
const initialState = {spot:{}}

const reviewsReducer = (state = initialState, action) =>{
  let newState;
  switch (action.type) {
    case LOAD_REVIEWS_BY_USER:{
      newState = {...state}
      newState.spot = normalizeArray(action.reviews)
      return newState
    }
    case LOAD_REVIEWS_BY_SPOT_ID:{
      newState = {...state}
      newState.spot = normalizeArray(action.reviews.Reviews)
      return newState
    }
    case CREATE_REVIEW_BY_SPOT_ID:{
      newState = {...state}
      newState.spot[action.newReview.id] = action.newReview
      return newState
    }
    case ADD_REVIEW_IMAGE_BY_REVIEW_ID:{
      newState = {...state}
      newState.spot[action.newReview.ReviewImages] = action.newReview
      return newState
    }
    case EDIT_REVIEW_BY_REVIEW_REVIEW_ID:{
      newState = {...state}
      newState.spot[action.review.id] = action.reviews
      return newState
    }
    case DELETE_REVIEW_BY_REVIEW_ID:{
      // newState = {...state, spot:{...state.spot}}
      newState = {...state}
      delete newState.spot[action.id]
      // console.log('this is newState in DELETE REVIEW REDUCER', newState)
      return newState
    }
    default:
      return state;
  }
}
export default reviewsReducer
