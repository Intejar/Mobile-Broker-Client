import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { ClimbingBoxLoader } from 'react-spinners';


const Android = () => {
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['Android'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products?category=Android')
            const data = await res.json();
            return data
        }
    })

    if (isLoading) {
        return <div className='flex justify-center items-center'><ClimbingBoxLoader color="#36d7b7" /></div>
    }
    return (
        <div>
            <h1>All Android Products Here</h1>
            <div className='grid grid-cols-1 '>
                {
                    products.map(product =><ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Android;