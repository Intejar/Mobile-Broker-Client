import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertiseProduct from '../AdvertiseProduct/AdvertiseProduct';
import Banner from '../Bannner/Banner';
import Category from '../Category/Category';
import { ClimbingBoxLoader } from 'react-spinners';
import Contact from '../Contact/Contact';
import { TabTitle } from '../../../DynamicTitle/DynamicTitle';


const Home = () => {
    TabTitle('Mobile Broker')
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['Product'],
        queryFn: async () => {
            const res = await fetch('https://mobile-broker-server.vercel.app/advertise')
            const data = await res.json();
            return data
        }
    })

    if (isLoading) {
        return <div className='flex justify-center items-center'><ClimbingBoxLoader color="#36d7b7" /></div>
    }
    return (
        <div className='min-h-screen dark:text-white'>
            <div className='mx-5'>
                <Banner></Banner>
            </div>
            <div className='mx-5 my-10'>
                <Category></Category>
            </div>
            {
                products.length>0 &&
                <div className='mx-5 my-10'>
                    <AdvertiseProduct></AdvertiseProduct>
                </div>
            }
            <div className='mx-auto'>
                <Contact></Contact>
            </div>
        </div>
    );
};

export default Home;