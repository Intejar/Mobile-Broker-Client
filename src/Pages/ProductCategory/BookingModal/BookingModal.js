import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({booking, user}) => {
    const navigate = useNavigate()
    const [info, setInfo] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/products/${booking}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setInfo(data)
            })
    }, [booking])
    const handleBooking = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const productName = form.productName.value;
        const productPrice = form.productPrice.value;
        const location = form.location.value;
        const phoneNumber = form.phoneNumber.value;
        const productId = form.productId.value
 
        const bookingInfo = {
            productId: productId,
            customerName : name,
            customerEmail : email,
            customerPhone : phoneNumber,
            productName: productName,
            productPrice: productPrice,
            location: location,
            paymentStatus : 'unpaid'
        }
        fetch('http://localhost:5000/bookings', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success(`your booking for ${productName} is confirmed`)
                    navigate('/dashboard/MyOrders')
                    
                }
                else{
                    toast.error(data.message)
                    
                }
            })
    }
    

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1>Mobile-Broker</h1>
                    <h3 className="text-lg font-bold my-3">Edit Previous Information</h3>
                    <form onSubmit={handleBooking} className='text-center'>
                        <label className="label">
                            <span className="label-text">Customer Name</span>
                        </label>
                        <input name='name' type="text" placeholder="Product Name" defaultValue={user?.displayName} disabled  className="my-1 input input-border input-accent  w-full " />
                        <label className="label">
                            <span className="label-text">Customer Email</span>
                        </label>
                        <input name='email' type="text" placeholder="Product Name" defaultValue={user?.email} disabled  className="my-1 input input-border input-accent  w-full " />
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input name='productName' type="text" placeholder="Product Name" defaultValue={info?.productName} disabled className="my-1 input input-border input-accent  w-full " />
                        <label className="label">
                            <span className="label-text">Product ID</span>
                        </label>
                        <input name='productId' type="text" placeholder="Product Name" defaultValue={info?._id} disabled className="my-1 input input-border input-accent  w-full " />
                        <label className="label">
                            <span className="label-text">Product Resale Price</span>
                        </label>
                        <input name='productPrice' type="text" placeholder="Product Resale Price" defaultValue={info?.resalePrice} disabled  className="my-1 input input-border input-accent w-full " />
                        <label className="label">
                            <span className="label-text">Customer Contact No</span>
                        </label>
                        <input name='phoneNumber' type="text" placeholder="+880"  className="my-1 input input-border border-gray-200 w-full " />
                        <label className="label">
                            <span className="label-text">MeetUp Location</span>
                        </label>
                        <input name='location' type="text" placeholder="Meet up location"  className="my-1 input input-border border-gray-200 w-full " />
                        <input type="submit" value='confirm booking' className="my-1 input input-border input-accent bg-accent text-white w-full " />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;