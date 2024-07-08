import React from 'react';
import notFound from './err.jpg'
function NotFound(props) {
    return (
        <div className='w-100'>
            <img src={notFound} alt='Not Found!' className='w-100'></img>
        </div>
    );
}

export default NotFound;