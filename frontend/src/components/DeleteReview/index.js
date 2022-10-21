import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import SingleSpot from '../SpotDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteReview } from '../../store/reviews';
import './DeleteReview.css'

function DeleteReview(){
  const dispatch = useDispatch();
  const history = useHistory();
  const spot = useSelector(state => state.spots.singleSpot)
  const user = useSelector(state => state.session.user)

  
}
export default DeleteReview
