import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import { TabTitle } from '../../../DynamicTitle/DynamicTitle';

const UserProfile = () => {
    TabTitle('Dashboard-Mobile Broker')
    const { user } = useContext(AuthContext)
    const [userRole, setUserRole] = useState([])
    useEffect(() => {
        fetch(`https://mobile-broker-server.vercel.app/users?email=${user?.email}`)
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
                <div className='mx-auto'>
                    <ul className="steps steps-vertical">
                        <li className="step step-primary">Add Product</li>
                        <li className="step step-primary">See Your Product in My Product</li>
                        <li className="step">Sale Your Product</li>
                        <li className="step">Stay With Mobile Broker</li>
                    </ul>
                </div>
            }
            {
                userInfo?.role === 'buyer' &&
                <div>
                    <ul className="steps steps-vertical">
                        <li className="step step-primary">Book Your Product</li>
                        <li className="step step-primary">See Your Booked Product in My Orders</li>
                        <li className="step">Make Wish by clicing Heart</li>
                        <li className="step">Buy A Product</li>
                    </ul>
                </div>
            }
            {
                userInfo?.role === 'admin' &&
                <div>
                    <ul className="steps steps-vertical">
                        <li className="step step-primary">Hlw Admin</li>
                        <li className="step step-primary">Add Product</li>
                        <li className="step step-primary">Buy Product</li>
                        <li className="step step-primary">See User</li>
                        <li className="step">Seller</li>
                        <li className="step">Buyer</li>
                    </ul>
                </div>
            }

        </div>
    );
};

export default UserProfile;