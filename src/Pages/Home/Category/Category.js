import React from 'react';
import apple from '../../../assets/images/IPHONE.png'
import android from '../../../assets/images/ANDROID.png'
import google from '../../../assets/images/GOOGLE.png'
import { Link } from 'react-router-dom';
import { Fade } from 'react-reveal';

const Category = () => {
    return (
        <div className=''>
            <h1 className='text-2xl text-center font-bold mb-5'>Available Category</h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-3'>
                <Fade left>
                    <div className="card card-side bg-base-100 dark:bg-slate-600 shadow-xl">
                        <figure><img src={apple}  alt="Movie" /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-2xl font-bold">Apple Products</h2>
                            <p>Here you can find all apple I phone that sellers posted to sale!</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary"><Link to='/category/apple'>see products</Link></button>
                            </div>
                        </div>
                    </div>
                </Fade>
                <Fade top>
                    <div className="card card-side bg-base-100  dark:bg-slate-600 shadow-xl">
                        <figure><img src={android} alt="Movie" /></figure>
                        <div className="card-body text-2xl font-bold">
                            <h2 className="card-title">Android Products</h2>
                            <p>Here You can find all android products that sellers has posted to sale!</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary"><Link to='/category/android'>see products</Link></button>
                            </div>
                        </div>
                    </div>
                </Fade>
                <Fade right>
                    <div className="card card-side bg-base-100  dark:bg-slate-600 shadow-xl">
                        <figure><img src={google} alt="Movie" /></figure>
                        <div className="card-body text-2xl font-bold">
                            <h2 className="card-title">Google Products</h2>
                            <p>Here You can find all google pixel phones that sellers has posted!</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary"><Link to='/category/google'>see products</Link></button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    );
};

export default Category;