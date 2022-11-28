import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { FaEyeSlash, FaEye, FaGoogle, FaGithub, FaWindows } from "react-icons/fa";
import './Register.css';
import Lottie from 'react-lottie';


const Register = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: require('../../login.json'),
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUserProfile, googleLogIn } = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider()
    const [open, setOpen] = useState(false);
    const [signUpError, setSignUpError] = useState('')
    const [alreadyLogIn, setAlreadyLogIn] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const imageHostKey = process.env.REACT_APP_imgbbKey;
    console.log(imageHostKey)
    // const [token] = useToken(userEmail)
    const navigate = useNavigate()

    // if (token) {
    //     navigate('/home')
    // }

    const toggle = () => {
        setOpen(!open)
    }
    const handleRegister = data => {
        console.log(data)

        if (data.password !== data.confirmPassword) {
            setSignUpError('confirm password doesnot match!!')
        }
        else {
            createUser(data.email, data.password)
                .then(result => {
                    const user = result.user;
                    console.log(user)
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
                            const image = imgData.data.url
                            handleUpdate(data.name, image)
                            saveUser(data.name, data.email, data.role, image)
                        })


                })
                .catch(error => {
                    console.error(error)
                    const errorMsg = error.message;
                    setSignUpError(errorMsg)
                })
            const handleUpdate = (name, img) => {
                const profile = {
                    displayName: name,
                    photoURL: img
                }
                console.log(profile)
                updateUserProfile(profile)
                    .then(() => { })
                    .catch(e => console.error(e))
            }
        }
    }
    const handleGoogleLogIn = () => {

        googleLogIn(googleProvider)
            .then(res => {
                const user = res.user
                console.log(user)
                fetch(`http://localhost:5000/users?email=${user.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.length) {
                            setUserEmail(data.email)
                            toast.success('user login successfull')
                            navigate('/home')
                        }
                        else {
                            const role = 'buyer'
                            saveUser(user.displayName, user.email,role, user.photoURL)
                        }
                    })
            })
            .catch(err => {
                const errMsg = err.message;
                setSignUpError(errMsg)
            })
    }

    const saveUser = (name, email, role, image) => {
        const newUser = {
            name: name,
            email: email,
            role: role,
            img: image
        };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                setUserEmail(email)
                toast.success('user registered successfully!!')
                window.location.reload(false);
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200 dark:bg-slate-800">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-slate-600">
                    <form onSubmit={handleSubmit(handleRegister)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input {...register("name", { required: "Name is required" })} type="text" placeholder="Full Name" className="input input-bordered" />
                            {errors.name && <p className='text-sm text-red-400 mt-3' role="alert">{errors.name?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", { required: "Email Address is required" })} type="text" placeholder="email" className="input input-bordered" />
                            {errors.email && <p className='text-sm text-red-400 mt-3' role="alert">{errors.email?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">User Photo</span>
                            </label>
                            <input type="file" {...register("img", { required: "Image is required" })} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                            {errors.img && <p className='text-sm text-red-400 mt-3' role="alert">{errors.img?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Your Role</span>
                            </label>
                            <select {...register("role")} className='select select-ghost w-full bg-white select-bordered'>
                                <option value="seller">Seller</option>
                                <option value="buyer" selected>buyer</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className='pass flex justify-between items-center border rounded-lg p-3 dark: bg-white'>
                                <input  {...register("password", { required: "Password is required", pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} type={(open === false) ? 'password' : 'text'} placeholder="password" className="dark:text-black dark:bg-white" />
                                {
                                    (open === false) ? <FaEyeSlash className='dark:text-black' onClick={toggle}></FaEyeSlash> : <FaEye className='dark:text-black' onClick={toggle}></FaEye>
                                }
                            </div>
                            {errors.password && <p className='text-sm text-red-400' role="alert">{errors.password?.message}</p>}
                            {errors?.password?.type === 'pattern' && <p className='text-xs text-red-400 max-w-fit mt-3' role="alert">Minimum eight characters, at least one uppercasse,lowercase,number,special letter</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <div className='pass flex justify-between items-center border rounded-lg p-3 dark: bg-white'>
                                <input  {...register("confirmPassword", { required: "Confirm Password is required" })} type={(open === false) ? 'password' : 'text'} placeholder="confirm password" className="dark:text-black dark:bg-white" />
                                {
                                    (open === false) ? <FaEyeSlash className='dark:text-black' onClick={toggle}></FaEyeSlash> : <FaEye className='dark:text-black' onClick={toggle}></FaEye>
                                }
                            </div>
                            {errors.confirmPassword && <p className='text-sm text-red-400' role="alert">{errors.confirmPassword?.message}</p>}
                        </div>
                        {
                            signUpError && <p className='text-red-500 my-3'>{signUpError}</p>
                        }
                        <div className="form-control mt-6">
                            <button className="btn">Signup</button>
                        </div>
                        <div className="form-control mt-1">
                            <label className="label">
                                <h1 className='text-sm text-center'>Already have an account?<Link to='/login' className="link link-primary dark:text-white">login</Link></h1>
                            </label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <hr className='w-1/2' />
                            <h1 className='text-sm font-bold'>OR</h1>
                            <hr className='w-1/2' />
                        </div>
                        <div className="form-control mt-6">
                        <button onClick={handleGoogleLogIn} className="btn btn-primary"><span className='flex items-center space-x-4'><span><FaGoogle></FaGoogle> </span> <span>continue with google</span></span></button>
                        </div>
                    </form>
                </div>
                <div className='w-1/2'>
                    <Lottie options={defaultOptions}  />
                </div>

            </div>
        </div>
    );
};

export default Register;