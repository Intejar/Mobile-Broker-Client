import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import AdvertiseCard from './AdvertiseCard';


const AdvertiseProduct = () => {
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
        <div>
            <h1 className='text-2xl text-center font-bold mb-5'>Advertised Product</h1>
            <div className='grid sm:grid-cols-1  md:grid-cols-3 gap-2'>
                {
                    products.map(product => <AdvertiseCard key={product._id} product={product}></AdvertiseCard>)
                }
            </div>
        </div>
    );
};

export default AdvertiseProduct;