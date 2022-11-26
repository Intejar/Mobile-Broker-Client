import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPhoneAlt, FaMailBulk, FaMapMarkerAlt} from "react-icons/fa";
import { HiHeart } from "react-icons/hi";



const ProductCard = ({ product }) => {
    const { category, phoneNumber, condition, date, description, email, location, originalPrice, photo, productImg, productName, purchaseYear, usedYear, resalePrice } = product
    const [heart, setHeart] = useState(<HiHeart></HiHeart>)
    const handleHeart =()=>{
        setHeart(<HiHeart className='text-red-500'></HiHeart>)
        toast.success('added to wishlist')
    }
    return (
        <div className="hero bg-gray-300 mx-5">
            <div className="hero-content flex-col lg:flex-row">
                <img src={productImg} alt="productImg" className="max-w-sm rounded-lg shadow-2xl" />
                <div className='card'>
                    <div className='flex items-center space-x-2'>
                        <div className="avatar">
                            <div className="w-24 rounded-xl">
                                <img src={photo}  alt='sellerPhoto'/>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center space-x-2'>
                                <div><FaMailBulk></FaMailBulk></div>
                                <div className='text-md'>{email}</div>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <div><FaPhoneAlt></FaPhoneAlt></div>
                                <div className='text-md'>{phoneNumber}</div>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <div><FaMapMarkerAlt></FaMapMarkerAlt></div>
                                <div className='text-md'>{location}</div>
                            </div>
                        </div>
                    </div>
                    <div className='card-body'>
                        <h1 className="text-5xl font-bold">{productName}</h1>
                        <h1 className="text-3xl font-bold">Asking Price: ৳ {resalePrice}</h1>
                        <hr />
                        <p className="py-6">{description}</p>
                        <hr />
                        <ul style={{listStyleType: 'square'}}>
                            <li>Product Condition: {condition}</li>
                            <li>Product Purchased Year: {purchaseYear}</li>
                            <li>Product Used: {usedYear} Y </li>
                            <li>Product Original Price: ৳ {originalPrice}</li>
                        </ul>
                        <hr />
                        <h1>Posted on : {date}</h1>

                    </div>
                    <div className='card-action justify-end space-x-3'>
                        <button className="btn btn-primary">Report</button>
                        <button onClick={handleHeart} className="btn btn-primary">{heart}</button>
                        <button className="btn btn-primary">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;