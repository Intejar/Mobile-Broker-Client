import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const UserProfile = () => {
    const { user } = useContext(AuthContext)
    const [userRole, setUserRole] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUserRole(data)
            })
    }, [user?.email])
    const userInfo = userRole[0]
    return (
        <div>
            {
                userInfo?.role === 'seller' &&
                <>
                    <ul className="steps steps-vertical">
                        <li className="step step-primary">Add Product</li>
                        <li className="step step-primary">See Your Product in My Product</li>
                        <li className="step">Sale Your Product</li>
                        <li className="step">Stay With Mobile Broker</li>
                    </ul>
                </>
            }
            {
                userInfo?.role === 'buyer' &&
                <>
                    <ul className="steps steps-vertical">
                        <li className="step step-primary">Book Your Product</li>
                        <li className="step step-primary">See Your Booked Product in My Orders</li>
                        <li className="step">Make Wish by clicing Heart</li>
                        <li className="step">Buy A Product</li>
                    </ul>
                </>
            }
        </div>
    );
};

export default UserProfile;