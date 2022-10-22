// import { csrfFetch } from "./csrf";
// // TODO define types
// const CREATE_REVIEW_BY_SPOT_ID = 'reviews/actionCreateReviewBySpotId'
// const ADD_REVIEW_IMAGE_TO_NEW_REVIEW = 'reviews/actionAddReviewImageToNewReview'
// const LOAD_REVIEWS_BY_USER = 'reviews/actionLoadReviewsByUser'
// const LOAD_REVIEWS_BY_SPOT_ID = 'reviews/actionLoadReviewsBySpotId'
// const EDIT_REVIEW_BY_REVIEW_ID = 'reviews/actionEditReviewByReviewId'
// const DELETE_REVIEW_BY_SPOT_ID = 'reviews/actionDeleteReviewBySpotId'
// // TODO define action creators
// export const actionCreateReviewBySpotId = (id) =>({
//   type: CREATE_REVIEW_BY_SPOT_ID,
//   id
// })
// export const actionAddReviewImageToNewReview = (review) =>({
//   type: ADD_REVIEW_IMAGE_TO_NEW_REVIEW,
//   review
// })

// // export const actionLoadReviewsByUser = (reviews)=>({
// //   type: LOAD_REVIEWS_BY_USER,
// //   reviews
// // })
// export const actionLoadReviewsBySpotId = (reviews) =>({
//   type: LOAD_REVIEWS_BY_SPOT_ID,
//   reviews
// })
// export const actionEditReviewByReviewId =(reviews) =>({
//   type: EDIT_REVIEW_BY_REVIEW_ID,
//   reviews
// })
// // use id or spot?
// export const actionDeleteReviewBySpotId = (id) =>({
//   type: DELETE_REVIEW_BY_SPOT_ID,
//   id
// })
// function normalizeArray(dataArray) {

// 	if (!(dataArray instanceof Array))
// 		throw new Error('Normalize problem: data invalid');

// 	const obj = {};
// 	dataArray.forEach((el) => {
// 		obj[el.id] = el;
// 	});
// 	return obj;
// }
// // TODO define thunks
// // ****CREATE********************************************************************************************************************
// export const createReview = () => async(dispatch) => {

// }
// export const addReviewImage = () => async(dispatch) => {

// }
// // ****READ********************************************************************************************************************
// // export const loadReviewsByUserThunk = () => async(dispatch) =>{
// //   const response = await csrfFetch(`/api/reviews/current`)
// //   if(response.ok){
// //     const data = await response.json()
// //     dispatch(actionLoadReviewsByUser(data))
// //     return response
// //   }
// // }

// export const loadReviewsBySpotThunk = (spotId) => async(dispatch) =>{
//   const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
//   // console.log('response from review by spot id', response)
//   if(response.ok){
//     const data = await response.json()
//     dispatch(actionLoadReviewsBySpotId(data))
//     return response;
//   }
// }
// // ****UPDATE********************************************************************************************************************
// export const editReview = () => async(dispatch) =>{

// }
// // ****DELETE********************************************************************************************************************
// export const deleteReview = () => async(dispatch) => {

// }
// // TODO define reducer
// const initialState = {spot:{}}

// const reviewsReducer = (state = initialState, action) =>{
//   let newState;
//   switch (action.type) {
//     case LOAD_REVIEWS_BY_USER:{
//       newState = {...state}
//       newState.spot = normalizeArray(action.reviews)
//       return newState
//     }
//     case LOAD_REVIEWS_BY_SPOT_ID:{
//       newState = {...state}
//       // console.log('newState in review reducer'. newState)
//       newState.spot = normalizeArray(action.reviews.Reviews)
//       return newState
//     }
//     default:
//       return state;
//   }
// }
// export default reviewsReducer
