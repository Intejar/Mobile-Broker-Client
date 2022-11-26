import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbbKey
    const setDate = new Date()
    console.log(imageHostKey)

    const handleAddProduct = data => {

        console.log(data)
        const image = data.img[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const product = {
                        name: data.name,
                        email: data.email,
                        photo: data.photo,
                        location : data.location,
                        productImg: imgData.data.url,
                        productName : data.productName,
                        category : data.category,
                        condition : data.condition,
                        purchaseYear : data.purchaseYear,
                        usedYear : data.usedYear,
                        originalPrice : data.originalPrice,
                        resalePrice : data.resalePrice,
                        description : data.description,
                        date : format(setDate,'PP')
                    }
                    console.log(product)
                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            toast.success(`${data.name} your product added successfully`)
                        })
                }
            })

    }

    return (
        <div>
            <h1 className='text-xl mt-5 font-bold text-center'>Add A Product</h1>
            <div className="w-full min-h-screen  dark:bg-slate-400">
                <div className="hero-content ">
                    <div className=" flex-shrink-0 w-full ">
                        <form onSubmit={handleSubmit(handleAddProduct)} className="card-body">
                            <div className='grid grid-cols-2 gap-2'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input {...register("name", { required: "Name is required" })} type="text" value={user?.displayName} placeholder="Full Name" className="input input-bordered" />
                                    {errors.name && <p className='text-sm text-red-400 mt-3' role="alert">{errors.name?.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input {...register("email", { required: "Email Address is required" })} type="text" value={user?.email} placeholder="email" className="input input-bordered" />
                                    {errors.email && <p className='text-sm text-red-400 mt-3' role="alert">{errors.email?.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">User Photo URL</span>
                                    </label>
                                    <input {...register("photo", { required: "Email Address is required" })} type="text" value={user?.photoURL} placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input {...register("phoneNumber", { required: "Phone Number is required" })} type="text" placeholder="phone number" className="input input-bordered" />
                                    {errors.phoneNumber && <p className='text-sm text-red-400 mt-3' role="alert">{errors.phoneNumber?.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Location</span>
                                    </label>
                                    <input {...register("location", { required: "Name is required" })} name='location' type="text" placeholder="city" className="input input-bordered" />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Name</span>
                                    </label>
                                    <input {...register("productName", { required: "Name is required" })} name='productName' type="text" placeholder="Detailed Product Name" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Select Product Category</span>
                                    </label>
                                    <select {...register("category", { required: "Name is required" })} name='category' className='select select-ghost w-full bg-white'>
                                        <option disabled selected>select an option</option>
                                        <option value='Apple'>Apple</option>
                                        <option value='Android'>Android</option>
                                        <option value='Google'>Google</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Photo</span>
                                    </label>
                                    <input type="file" {...register("img", { required: "Image is required" })} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                                    {errors.img && <p className='text-sm text-red-400 mt-3' role="alert">{errors.img?.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Select Product Condition</span>
                                    </label>
                                    <select {...register("condition")} name='condition' className='select select-ghost w-full bg-white'>
                                        <option disabled selected>Select An option</option>
                                        <option value='Excellent'>Excellent</option>
                                        <option value='Good'>Good</option>
                                        <option value='Fair'>Fair</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Year Of Purchase</span>
                                    </label>
                                    <input {...register("purchaseYear")} name='purchaseYear' type="text" placeholder="Product Purchase Year" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Year Of Product Use</span>
                                    </label>
                                    <input {...register("usedYear")} name='usedYear' type="text" placeholder="Year Of Use" className="input input-bordered" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Original Price</span>
                                    </label>
                                    <input {...register("originalPrice")} name='originalPrice' type="text" placeholder="Original Price" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Resale Price</span>
                                    </label>
                                    <input {...register("resalePrice")} name='resalePrice' type="text" placeholder="Your Asking Price" className="input input-bordered" />
                                </div>

                                
                            </div>
                            <div className="form-control mt-3 w-full">
                                    <label className="label">
                                        <span className="label-text">Product Description</span>
                                    </label>
                                    <textarea {...register("description")} name='description' className="textarea textarea-bordered" placeholder="Product Details"></textarea>
                                </div>
                            <div className="form-control mt-6">
                                <button className="btn">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;