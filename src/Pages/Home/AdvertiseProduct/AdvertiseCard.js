import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaMailBulk, FaMapMarkerAlt,FaUserTie } from "react-icons/fa";


const AdvertiseCard = ({ product }) => {
    const {sellerName, sellerEmail, sellerPhoto, productName, productImg, productPrice} = product
    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure><img src={productImg} alt="Movie" /></figure>
            <div className='card p-5'>
                <div className='flex items-center space-x-2'>

                    <div className="avatar">
                        <div className="w-24 rounded-xl">
                            <img src={sellerPhoto} alt='sellerPhoto' />
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center space-x-2'>
                            <div><FaUserTie></FaUserTie></div>
                            <div className='text-md'>{sellerName}</div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <div><FaMailBulk></FaMailBulk></div>
                            <div className='text-md'>{sellerEmail}</div>
                        </div>
                    </div>
                </div>
                <div className='card-body'>
                    <h1 className="text-2xl font-bold">{productName}</h1>
                    <h1 className="text-xl font-bold">Price: ৳ {productPrice}</h1>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default AdvertiseCard;