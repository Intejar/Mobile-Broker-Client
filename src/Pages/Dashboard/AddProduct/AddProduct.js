import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ClimbingBoxLoader } from 'react-spinners';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgBB
    console.log(imageHostKey)



    const handleAddProduct = data => {
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
                    const doctors = {
                        name: data.name,
                        email: data.email,
                        specialty: data.selected,
                        image: imgData.data.url
                    }
                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctors)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            toast.success(`DR.${data.name} added successfully`)
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
                            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-2'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input {...register("name")} type="text" defaultValue={user?.displayName} disabled placeholder='Full Name' className="input input-bordered" />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input {...register("email", { required: "Email Address is required" })} type="text" defaultValue={user?.email} disabled placeholder="email" className="input input-bordered" />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input {...register("phoneNumber", { required: "Phone Number is required", pattern: /[0-9]{11}/ })} type="text" placeholder="+880" className="input input-bordered" />
                                    {errors.phoneNumber && <p className='text-sm text-red-400 mt-3' role="alert">{errors.phoneNumber?.message}</p>}
                                    {errors?.phoneNumber?.type === 'pattern' && <p className='text-xs text-red-400 max-w-fit mt-3' role="alert">invalid phone no it must be 11 number.</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Location</span>
                                    </label>
                                    <input {...register("location", { required: "Location is required" })} type="text" placeholder="city" className="input input-bordered" />
                                    {errors.location && <p className='text-sm text-red-400 mt-3' role="alert">{errors.location?.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Name</span>
                                    </label>
                                    <input {...register("productName", { required: "Product Name is required" })} type="text" placeholder="Detailed Product Name" className="input input-bordered" />
                                    {errors.productName && <p className='text-sm text-red-400 mt-3' role="alert">{errors.productName?.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Select Product Category</span>
                                    </label>
                                    <select {...register("category", { required: "Product Category is required" })} className='select select-ghost w-full bg-white'>
                                        <option disabled selected>Select An Category</option>
                                        <option value='Apple'>Apple</option>
                                        <option value='Android'>Android</option>
                                        <option value='Google'>Google</option>
                                        {errors.category && <p className='text-sm text-red-400 mt-3' role="alert">{errors.category?.message}</p>}
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Image</span>
                                    </label>
                                    <input type="file" {...register("img", { required: "Image is required" })} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                                    {errors.img && <p className='text-sm text-red-400 mt-3' role="alert">{errors.img?.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Select Product Condition</span>
                                    </label>
                                    <select {...register("condition", { required: "Product Condition is required" })} className='select select-ghost w-full bg-white'>
                                        <option disabled selected>Select An option</option>
                                        <option value='Excellent'>Excellent</option>
                                        <option value='Good'>Good</option>
                                        <option value='Fair'>Fair</option>
                                        {errors.category && <p className='text-sm text-red-400 mt-3' role="alert">{errors.category?.message}</p>}
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Year Of Purchase</span>
                                    </label>
                                    <input {...register("purchaseYear", { required: "Product Purchase year is required" })} type="text" placeholder="Product Purchase Year" className="input input-bordered" />
                                    {errors.purchaseYear && <p className='text-sm text-red-400 mt-3' role="alert">{errors.purchaseYear?.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Year Of Product Use</span>
                                    </label>
                                    <input {...register("usedYear", { required: "Product Used year is required" })} type="text" placeholder="Year Of Use" className="input input-bordered" />
                                    {errors.usedYear && <p className='text-sm text-red-400 mt-3' role="alert">{errors.usedYear?.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Original Price</span>
                                    </label>
                                    <input {...register("originalPrice", { required: "Product Used year is required" })} type="text" placeholder="Original Price" className="input input-bordered" />
                                    {errors.originalPrice && <p className='text-sm text-red-400 mt-3' role="alert">{errors.originalPrice?.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Resale Price</span>
                                    </label>
                                    <input {...register("resalePrice", { required: "Product Used year is required" })} type="text" placeholder="Your Asking Price" className="input input-bordered" />
                                    {errors.resalePrice && <p className='text-sm text-red-400 mt-3' role="alert">{errors.resalePrice?.message}</p>}
                                </div>
                            </div>
                            <div className="form-control mt-3 w-full">
                                <label className="label">
                                    <span className="label-text">Product Description</span>
                                </label>
                                <textarea {...register("description", { required: "Product description is required" })} className="textarea textarea-bordered" placeholder="Product Details"></textarea>
                                {errors.description && <p className='text-sm text-red-400 mt-3' role="alert">{errors.description?.message}</p>}
                            </div>
                            <div className="form-control mt-6 w-full">
                                <button className="btn btn-primary">Add</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddProduct;