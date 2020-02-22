import React from 'react';
import Modal from 'react-responsive-modal';
import { FormError } from '../../utils/form/FormError';

export function BookingModal(props) {
  const { open,
          closeModal,
          booking,
          confirmModal,
          errors,
          rentalPrice,
          acceptPayment,
          disabled } = props;

  return (
    <Modal open={open} onClose={closeModal} little classNames={{ modal: 'booking-modal' }}>
     <h4 className='modal-title title'>Confirm Booking </h4>
     <p className='dates'>From {booking.startAt} To {booking.endAt}</p>
     <div className='modal-body'>
      <em>{booking.days}</em> nights /
      <em>{rentalPrice}$</em> per Night
      <p>Guests: <em>{booking.guests}</em></p>
      <p>Price: <em>{booking.totalPrice}$ </em></p>

      {acceptPayment && acceptPayment()}
      <small>Card Number: 4242 4242 4242 4242</small>
      <br />
      <small>Exp Date: 04/24</small>
      <br />
      <small>CVC: 424</small>
      <br />
      <small>Zip Code: 42424</small>
      <p style={{ marginTop: '4px'}}>Do you confirm your booking for selected days?</p>
    </div>
    <FormError errors={errors} />
    <div className='modal-footer'>
      <button disabled={disabled} onClick={confirmModal} type='button' className='btn btn-primary'>Confirm</button>
      <button type='button' onClick={closeModal} className='btn btn-danger'>Cancel</button>
    </div>
  </Modal>
  )
}
