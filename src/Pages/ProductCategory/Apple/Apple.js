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
        <div>
            <h1>All Apple Products Here</h1>
            <div className='grid grid-cols-1 gap-5'>
                {
                    products.map(product =><ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Apple;