import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const EditModal = ({ edit }) => {
    console.log(edit)
    const [info, setInfo] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/products/${edit}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setInfo(data)
            })
    }, [edit])

    const handleEdit = event => {
        event.preventDefault()
        const form = event.target;
        const details = form.details.value;
        const price = form.price.value;
        const name = form.name.value;

        const editedInfo = [
             name,
             price,
             details
        ]
        fetch(`http://localhost:5000/products/${edit}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(editedInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // if (data.acknowledged) {
                //     setTreatment(null)
                //     toast.success(`your booking for ${booking.treatment} is confirmed`)
                //     refetch()
                // }
                // else{
                //     toast.error(data.message)
                // }
            })
    }
    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1>Mobile-Broker</h1>
                    <h3 className="text-lg font-bold my-3">Edit Previous Information</h3>
                    <form onSubmit={handleEdit} className='text-center'>
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input name='name' type="text" placeholder="Product Name" defaultValue={info.productName} className="my-1 input input-border input-accent  w-full " />
                        <label className="label">
                            <span className="label-text">Product Resale Price</span>
                        </label>
                        <input name='price' type="text" placeholder="Product Resale Price" defaultValue={info.resalePrice} className="my-1 input input-border input-accent w-full " />
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea name='details' className="textarea textarea-primary w-full" defaultValue={info.description}  placeholder="Bio"></textarea>
                        <input type="submit" value='save changes' className="my-1 input input-border input-accent bg-accent text-white w-full " />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditModal;