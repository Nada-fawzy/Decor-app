import React from 'react';
import animationData from './mobile-payment.json'
import Lottie from 'lottie-react';


function Payment(props) {
    return (
        <div className='w-100 pt-5'>
           <Lottie animationData={animationData} loop={true} style={{ width: '700px' }} className='m-auto'/>
        </div>
    );
}

export default Payment;