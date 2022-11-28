import React, { useEffect, useRef, useState } from 'react';
import ReactTyped from 'react-typed';
import img1 from '../../../assets/images/1st.png'
import img2 from '../../../assets/images/for seller.png'
import img3 from '../../../assets/images/for buyer.png'


const Banner = () => {
    let count = 0
    const slideRef = useRef();
    const featuredImages = [`${img1}`, `${img2}`, `${img3}`];
    const [currentIndex, setCurrentIndex] = useState(0)
    // const removeAnimation = () => {
    //     // slideRef.current.classList.remove("fade-anim");
    // };

    const handleOnNextClick = () => {
        count = (count + 1) % featuredImages.length;
        setCurrentIndex(count);
        // slideRef.current.classList.add("fade-anim");
    };

    const handleOnPrevClick = () => {
        const productsLength = featuredImages.length;
        count = (currentIndex + productsLength - 1) % productsLength;
        setCurrentIndex(count);
        // slideRef.current.classList.add("fade-anim");
    };
    useEffect(() => {
        startSlider();
        // slideRef.current.addEventListener("animationend", removeAnimation);
    }, []);
    const startSlider = () => {
        setInterval(() => {
            handleOnNextClick();
        }, 5000);
    };


    return (
        <div className="carousel w-full">
            <div className="hero">
                <div ref={slideRef} className="hero-content flex-col lg:flex-row-reverse">
                    <img src={featuredImages[currentIndex]} alt='img' className="w-1/2" />
                    <div>
                        <h1 className="sm:text-2xl md:text-5xl font-bold">Welcome To Mobile-Broker!</h1>
                        <div className='flex items-center space-x-2 my-3'>
                            <p className='sm:text-xl md:text-2xl font-bold'>
                                Most Trustworthy Site For Mobile
                            </p>
                            <ReactTyped
                                strings={['Buy', 'Sell']}
                                typeSpeed={120}
                                cursorStyle='_'
                                backSpeed={140}
                                loop
                                className='text-4xl font-bold'
                            />
                        </div>
                        <p className="py-6">This is the most trusted site for resale your used mobile phone. You can buy or sell and even pay from our site. It is totally free just <strong>Login</strong> and buy/sell.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                    <div className="absolute flex justify-center transform -translate-y-1/2 left-5 right-5 bottom-0">
                        <a onClick={handleOnPrevClick} className="text-xl text-white">-</a>
                        <a onClick={handleOnNextClick} className="text-xl text-white">-</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;