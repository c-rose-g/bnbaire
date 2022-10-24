// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import '../Navigation/Navigation.css'
function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
    <div className='navsignup-button-div'>
      <button className='navbarsignup-button' onClick={() => setShowModal(true)}>Sign Up</button>
    </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
