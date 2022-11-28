import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import { ClimbingBoxLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import EditModal from '../EditModal/EditModal';
import { useNavigate } from 'react-router-dom';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import { TabTitle } from '../../../DynamicTitle/DynamicTitle';



const MyProduct = () => {
    TabTitle('My Product-Mobile Broker')
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [edit, setEdit] = useState(null)
    const [advertise, setAdvertise] = useState('Advertise')
    const [btn, setBtn] = useState(false)
    const crntUserMail = user.email
    const { data: products = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['user', crntUserMail],
            queryFn: async () => {
                const res = await fetch(`https://mobile-broker-server.vercel.app/products?email=${crntUserMail}`);
                const data = await res.json();
                return data
            }
        }
    )
    if (isLoading) {
        return <div className='flex justify-center items-center'><ClimbingBoxLoader color="#36d7b7" /></div>
    }

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure you want to delete this user?')
        if (proceed) {
            fetch(`https://mobile-broker-server.vercel.app/products/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success('user has successfully deleted')
                        refetch()
                    }
                })
        }

    }

    const handleAdvertise = (id, name, email, photo, productName, productImg, productPrice) => {
        fetch(`https://mobile-broker-server.vercel.app/advertise?productId=${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    toast.error('Product is already Advertised!')
                }
                else{
                    const advertiseData = {
                        productId: id,
                        sellerName: name,
                        sellerEmail: email,
                        sellerPhoto: photo,
                        productName: productName,
                        productImg: productImg,
                        productPrice: productPrice,
                        status: 'unsold'
                    }
                    fetch('https://mobile-broker-server.vercel.app/advertise', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(advertiseData)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            toast.success(`product ${productName} is added in advertise page`)
                            navigate('/')

                        })
                }
            })


    }

    return (
        <div>
            <h1 className='text-2xl text-center dark:text-white my-5'>All Products</h1>
            <div className="overflow-x-auto mx-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Resale Price</th>
                            <th>Status</th>
                            <th>Advertise</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) =>
                                <tr key={product._id} setEdit={setEdit} setAdvertise={setAdvertise} setBtn={setBtn}>
                                    <th>{i + 1}</th>
                                    <td>{product.productName}</td>
                                    <td>{product.resalePrice}</td>
                                    <td>{product.status}</td>
                                    <td>{product.status === 'unsold' && <button onClick={() => handleAdvertise(product._id, product.name, product.email, product.photo, product.productName, product.productImg, product.resalePrice)} className='btn-md btn-primary'>{advertise}</button>}</td>
                                    <td><label onClick={() => setEdit(product._id)} htmlFor="my-modal-3" className='btn'><FaEdit className='text-blue-400 hover:text-xl'></FaEdit></label></td>
                                    <td><button onClick={() => handleDelete(product._id)}><FaTrashAlt className='text-red-400 hover:text-xl'></FaTrashAlt></button>
                                    </td>
                                </tr>
                            )
                        }
                        {
                            edit &&
                            <EditModal edit={edit} refetch={refetch}></EditModal>
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyProduct;