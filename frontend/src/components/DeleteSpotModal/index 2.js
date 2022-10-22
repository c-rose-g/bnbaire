// import React, {useState} from 'react';
// import { Modal } from '../../context/Modal';
// import SingleSpot from '../SpotDetails';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory, useParams } from 'react-router-dom';
// import { deleteSpot } from '../../store/allSpots';

// function DeleteWarningModal(){
//   const dispatch = useDispatch()
//   const history = useHistory()
//   const [showModal, setShowModal] = useState(false);
//   const {spotId} = useParams()
//   const spot = useSelector((state) => state.spots.singleSpot);
// 	const userSelector = useSelector((state) => state.session.user);

//   if (userSelector && userSelector.id === spot.ownerId){

//   }
//   const openModal = () =>{
//     setShowModal(true)
//   }

//   function closeModal(){
//     setShowModal(false)
//   }

//   //  dispatch a delete
//   const handleSubmit = (e) =>{
//     e.preventDefault();

//     dispatch(deleteSpot(spotId))
//     history.push('/')
//   }
//   return(
//     <>
//     <h1> Are you sure you want to delete?</h1>
//     {/* change to dispatch */}
//       <button onClick={handleSubmit}>Delete Spot</button>
//         <button onClick={closeModal}> No</button>

//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>

//           <SingleSpot />
//         </Modal>
//       )}
//     </>
//   )
// }
//  export default DeleteWarningModal
