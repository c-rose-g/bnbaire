//  store for all spots
import { csrfFetch } from './csrf';
// TODO define types
const LOAD_SPOTS = 'allSpots/actionLoadSpots'
const LOAD_SINGLE_SPOT = 'allSpots/actionLoadSingleSpot'
const CREATE_SPOT = 'allSpots/actionCreateSpot'
// TODO define action creator function
// action creators
// all spots
export const actionLoadSpots = (spots) =>({

    type: LOAD_SPOTS,
    payload: spots
})

// single spot
export const actionLoadSingleSpot = (spots, id) => (
  {
    type:LOAD_SINGLE_SPOT,
    spots,
    id
  }
)

export const actionCreateSpot = (spot) =>(
  {
    type: CREATE_SPOT,
    spot
  }
)
// TODO define thunks
// CREATE
export const createSingleSpot = (spot) => async (dispatch) =>{
  // const {address, city, state, country, lat, lng, name, description, price} = spot;

  const response = await csrfFetch('/api/spots/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      spot
      // address, city, state, country, lat, lng, name, description, price
    })
  })
  // fetch new image
  // const image = await csrfFetch('/api/spots',{

  // })
  if(response.ok){
    const data = await response.json()
    dispatch(createSingleSpot(data))
  }
}


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

  if(response.ok){
    const data = await response.json();
    dispatch(actionLoadSingleSpot(data))
    return response
  }
}
// normalize array

function normalizeArray(dataArray) {
	// professional way to write a short circuit:
	// check the opposite of thing you want, and return early
	// prevents you from adding your logic into this code block if it's undefined
	// need error handling in a function to check if data array is undefined,
	if (!(dataArray instanceof Array))
		throw new Error('Normalize problem: data invalid');

	const obj = {};
	//if data is an instance of an array then use array methods
	dataArray.forEach((el) => {
		// computed property value [el.id] equal to the resource ele itself(el)
		obj[el.id] = el;
	});
	// going to mutate obj, so we're going to return the obj
	return obj;
}

//  TODO reducer
const initialState = {allSpots:{}, singleSpot:{}}
const allSpotsReducer = (state = initialState, action) =>{
  let newState;
  switch (action.type) {
    case LOAD_SPOTS:{
      newState = normalizeArray(action.payload.Spots)
      // newState[action.payload.spot.id] = action.spots
      return newState
    }
    case LOAD_SINGLE_SPOT:{
      newState = normalizeArray(action.payload.Spots)
      return newState
    }
    case CREATE_SPOT:{
      newState = {...state}
      newState.singleSpot[action.spot.id] = action.spot
      // newState = normalizeArray(action.spot)
      return newState;
    }
    default:
      return state;
  }
}

export default allSpotsReducer
