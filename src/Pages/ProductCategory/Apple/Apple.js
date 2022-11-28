import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import ProductCard from '../ProductCard/ProductCard';


const Apple = () => {
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['Apple'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products?category=Apple')
            const data = await res.json();
            return data
        }
    })

    if (isLoading) {
        return <div className='flex justify-center items-center'><ClimbingBoxLoader color="#36d7b7" /></div>
    }
    return (
        <div className='my-10 min-h-screen'>
            <h1 className='text-2xl text-center font-bold my-4 dark:text-white'>All Apple Products Here</h1>
            {
                products.length > 0 ?
                    <div className='grid grid-cols-1 mx-10'>
                        {
                            products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                        }
                    </div>
                    :
                    <div className='text-center text-xl text-gray-500 font-bold'> No Product Available</div>
            }
        </div>
    );
};

export default Apple;