import React from 'react';
import Lottie from 'react-lottie';

const NotFound = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: require('../../errornotfound.json'),
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }
    return (
        <div className='mx-auto w-1/2'>
            <Lottie options={defaultOptions} />
        </div>
    );
};

export default NotFound;