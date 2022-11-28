import React from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
    const handleContact = (event) => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value
        toast.success(`Thank you ${name} for your respons!`)
        form.reset()
        
    }
    return (
        <div className='mt-10  p-5'>
            <h1 className='text-2xl text-center font-bold '>Contact Us</h1>
            <h1 className='text-3xl text-center font-bold'>Stay Connected With Us</h1>
            <div className="hero">
                <div className="hero-content">
                    <div className="card flex-shrink-0 w-full ">
                        <form onSubmit={handleContact} className="card-body">
                            <div className="form-control">
                                <input name='name' type="text" placeholder="Full Name" className="input input-bordered dark:text-black" />
                            </div>
                            <div className="form-control">
                                <input name='email' type="text" placeholder="Enter Your Mail" className="input input-bordered dark:text-black" />
                            </div>
                            <div className="form-control">
                                <textarea name='message' className="textarea textarea-bordered dark:text-black" placeholder="Your Message"></textarea>
                            </div>
                            <div className="rating">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked/>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            </div>
                            <div className="form-control mt-6">
                                <input value='submit' type='submit' className="btn btn-primary"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Contact;