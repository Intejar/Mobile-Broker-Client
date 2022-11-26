import React from 'react';
import apple from '../../../assets/images/apple.jpg'
import android from '../../../assets/images/android.jpg'
import google from '../../../assets/images/google-pixel.png'
import { Link } from 'react-router-dom';

const Category = () => {
    return (
        <div className=''>
            <h1 className='text-2xl text-center font-bold mb-5'>Available Category</h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-3'>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src={apple} alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Apple Products</h2>
                        <p>Here you can find all apple I phone that sellers posted to sale!</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary"><Link>see products</Link></button>
                        </div>
                    </div>
                </div>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src={android} alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Android Products</h2>
                        <p>Here You can find all android products that sellers has posted to sale!</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">see products</button>
                        </div>
                    </div>
                </div>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src={google} alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Google Products</h2>
                        <p>Here You can find all google pixel phones that sellers has posted!</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">see products</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;