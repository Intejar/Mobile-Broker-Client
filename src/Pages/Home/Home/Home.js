import React from 'react';
import Banner from '../Bannner/Banner';
import Category from '../Category/Category';

const Home = () => {
    return (
        <div className='dark:bg-slate-300'>
            <div className='mx-5'>
                <Banner></Banner>
            </div>
            <div className='mx-5 my-10'>
                <Category></Category>
            </div>
        </div>
    );
};

export default Home;