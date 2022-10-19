//  store for all spots
import { csrfFetch } from './csrf';
// TODO define types
const LOAD_SPOTS = 'allSpots/actionLoadSpots'
const LOAD_SINGLE_SPOT = 'allSpots/actionLoadSingleSpot'
const CREATE_SPOT = 'allSpots/actionCreateSpot'
const UPDATE_SPOT = 'allSpots/actionUpdateSpot'
const LOAD_SPOT_BY_USER = 'allSpots/actionLoadSpotByUser'
const CREATE_IMAGE = 'allSpots/actionCreateSpotImage'
const DELETE_SPOT = 'allSpots/actionDeleteSpot'
// TODO define action creator function
// all spots
export const actionLoadSpots = (spots) =>({

    type: LOAD_SPOTS,
    payload: spots
})
// spots by user
export const actionsLoadSpotsByUser = (spots) =>({
  type:LOAD_SPOT_BY_USER,
  spots,

})
// single spot
export const actionLoadSingleSpot = (spot) => (
  {
    type:LOAD_SINGLE_SPOT,
    spot
  }
)
// create a spot
export const actionCreateSpot = (spot) =>(
  {
    type: CREATE_SPOT,
    spot
  }
)
// update a spot
export const actionUpdateSpot = (spot) =>(
  {
    type: UPDATE_SPOT,
    spot,
  }
)
// create a spot image
export const actionCreateSpotImage = (spot) =>({
  type: CREATE_IMAGE,
  spot,
})

// delete a spot

export const actionDeleteSpot = (id) =>({
  type: DELETE_SPOT,
  id
})
// TODO define thunks
// ****CREATE********************************************************************************************************************
export const createSingleSpot = (spot) => async (dispatch) =>{
  const {address, city, state, country, lat, lng, name, description, price, url, SpotImages} = spot;
  // console.log('this destructures spot in createSingleSpot, url', url)
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // ...spot
      address, city, state, country, lat, lng, name, description, price, url, SpotImages
    })
  })
  if(response.ok){

    const data = await response.json()
    dispatch(CreateSpotImage(data, url))
    return data;
  }
}
export const CreateSpotImage = (spot, url) => async(dispatch)=>{
  // const {SpotImages, id} = spot

  // console.log('this is SpotImages in createSpotImage thunk',SpotImages)
  const response = await csrfFetch(`api/spots/${spot.id}/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      preview:true, url:url
    })
  })

  if(response.ok){
    const data = await response.json();
    // console.log('this is data in createSpotImage thunk', data)
    // console.log('createImageThunk, spot', spot)
    spot.SpotImages = [data]
    dispatch(actionCreateSpot(spot))
    return spot;
  }
}
// ****READ********************************************************************************************************************
export const thunkLoadSpots = () => async(dispatch) =>{
  const response = await csrfFetch('/api/spots')
  if(response.ok){
    const data = await response.json()
    dispatch(actionLoadSpots(data))
    // console.log(data.Spots)
    return response;
  }
}
export const thunkLoadSingleSpot = (id) => async(dispatch) =>{
  const response = await csrfFetch(`/api/spots/${id}`)
  // console.log('this is reponse in thunk',response)
  if(response.ok){
    const data = await response.json();
    // console.log('data in thunk',data)
    dispatch(actionLoadSingleSpot(data))
    return response
  }
}

export const thunkLoadSpotsByUser = () => async(dispatch) =>{
// console.log('this is spots in thunkLoadSpotsByUser, spots', spots)
  const response = await csrfFetch(`/api/spots/current`)
  // console.log('this is response from thunkLoadSpotsByUser, response', response)
  if(response.ok){
    const data = await response.json();
    // console.log('data by user in allSpots',data)
    dispatch(actionsLoadSpotsByUser(data));
    return response;
  }
}
// ****UPDATE********************************************************************************************************************
export const thunkUpdateSingleSpot = (spot, spotId) => async(dispath) =>{
  const { address, city, state, country, lat, lng, name, description, price } = spot;
  // console.log('spots id in thunkUpdateSingleSpot', spotId)
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // ...spot
      address, city, state, country, lat, lng, name, description, price     })
  })

  if(response.ok){
    const data = await response.json()
    dispath(actionUpdateSpot(data))
    // return response
    return data
  }
}
// ****DELETE********************************************************************************************************************

export const deleteSpot = (id) => async(dispatch) =>{
  const response = await csrfFetch(`/api/spots/${id}`,{
    method:'DELETE'
  })

  if(response.ok){
    const data = await response.json()
    dispatch(actionDeleteSpot(data, id))
    return data
  }
}
// normalize array
function normalizeArray(dataArray) {

	if (!(dataArray instanceof Array))
		throw new Error('Normalize problem: data invalid');

	const obj = {};
	dataArray.forEach((el) => {
		obj[el.id] = el;
	});
	return obj;
}

//  TODO reducer
const initialState = {allSpots:{}, singleSpot:{}}
const allSpotsReducer = (state = initialState, action) =>{
  let newState;
  switch (action.type) {
    case LOAD_SPOTS:{
      newState = {...state}
      newState.allSpots = normalizeArray(action.payload.Spots)
      // newState[action.payload.spot.id] = action.spots
      return newState
    }
    case LOAD_SINGLE_SPOT:{
      newState = {...state}
      // const imageUrl = action.
      newState.singleSpot = action.spot
      // console.log('newState in single spot reducer', newState)
      return newState
    }
    case CREATE_SPOT:{
      newState = {...state}
      newState.singleSpot = action.spot
      // newState = normalizeArray(action.spot)
      return newState;
    }
    case UPDATE_SPOT:{
      newState = {...state}
      // removed [action.spot.id]
      newState.singleSpot = action.spot
      // console.log('this is newState in UPDATE SPOT USER reducer', newState)
      return newState
    }
    case CREATE_IMAGE:{
      newState = {...state}
      newState.singleSpot[action.spot.SpotImages] = action.spot
      return newState
    }
    case LOAD_SPOT_BY_USER:{
      newState = {...state}
      newState.allSpots = normalizeArray(action.spots.Spots)
      // newState.allSpots[action.spots.ownerId] = action.spots
      return newState
    }
    case DELETE_SPOT:{
      newState = {...newState};
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
}

export default allSpotsReducer
