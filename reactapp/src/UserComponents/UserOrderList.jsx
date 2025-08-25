    import React, { useEffect, useState } from "react";
    import { fetchOrders } from "../utils/api.js";
    import UserOrderItem from "./UserOrderItem";

    const UserOrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders()
        .then(res => setOrders(res.data))
        .catch(err => console.error(err));
    }, []);

    const handleCancel = (id) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "CANCELLED" } : o));
    };

    return (
        <div className="p-4">
        <h2 className="text-xl font-bold mb-4">My Orders</h2>
        <ul className="space-y-2">
            {orders.map(order => (
            <UserOrderItem key={order.id} order={order} onCancel={handleCancel} />
            ))}
        </ul>
        </div>
    );
    };

    export default UserOrderList;
