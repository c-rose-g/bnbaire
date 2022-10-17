//  store for all spots
import { csrfFetch } from './csrf';
const LOAD_SPOTS = 'allSpots/loadSpots'

// action creators
const loadSpots = (spots) =>{
  return{
    type: LOAD_SPOTS,
    payload: spots
  }
}
// thunk action creators

export const thunkLoadSpots = () => async(dispatch) =>{
  const response = await csrfFetch('/api/spots')


  if(response.ok){
    const data = await response.json()
    dispatch(loadSpots(data))
    // console.log(data.Spots)
    return response;
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

// reducer
const initialState = {}
const allSpotsReducer = (state = initialState, action) =>{
  let newState;
  switch (action.type) {
    case LOAD_SPOTS:{
      newState = normalizeArray(action.payload.Spots)
      // newState[action.payload.spot.id] = action.spots
      return newState
    }
    default:
      return state;
  }
}

export default allSpotsReducer
