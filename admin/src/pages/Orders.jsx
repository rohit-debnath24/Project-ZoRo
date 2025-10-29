import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { backend_Url, currency } from '../App.jsx';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets.js';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backend_Url + '/api/order/list',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backend_Url + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };
  
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="w-full p-4 sm:p-6 lg:p-10 text-gray-800">
      <h3 className="text-2xl font-semibold mb-6">Order Page</h3>
      <div className="flex flex-col gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_0.5fr_1fr] gap-6 items-start border border-gray-300 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Column 1: Items & Address */}
            <div className="flex items-start gap-4">
              <img src={assets.parcel_icon} alt="Parcel Icon" className="w-10 h-10 mt-1" />
              <div className="flex flex-col gap-2 w-full">
                {/* Item List */}
                <p className="font-semibold text-gray-900">
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      {item.size ? ` (${item.size})` : ''}
                      {index === order.items.length - 1 ? '' : ', '}
                    </span>
                  ))}
                </p>
                {/* Customer Name */}
                <p className="font-medium text-gray-800">
                  {order.address.firstName + ' ' + order.address.lastName}
                </p>
                {/* Address */}
                <div className="text-sm text-gray-600 leading-snug">
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city +
                      ', ' +
                      order.address.state +
                      ', ' +
                      order.address.country +
                      ', ' +
                      order.address.zipcode}
                  </p>
                </div>
                {/* Phone */}
                <p className="text-sm text-gray-600">{order.address.phone}</p>
              </div>
            </div>

            {/* Column 2: Order Details */}
            <div className="flex flex-col gap-1 text-sm text-gray-700">
              <p>
                <span className="font-medium text-gray-900">Items: </span>
                {order.items.length}
              </p>
              <p>
                <span className="font-medium text-gray-900">Method: </span>
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-medium text-gray-900">Payment: </span>
                <span className={order.payment ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {order.payment ? 'Done' : 'Pending'}
                </span>
              </p>
              <p>
                <span className="font-medium text-gray-900">Date: </span>
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Column 3: Amount */}
            <p className="text-lg font-semibold text-gray-900 whitespace-nowrap lg:text-right">
              {currency}
              {order.amount}
            </p>

            {/* Column 4: Status */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="w-full max-w-xs border border-gray-400 rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For delivery">Out For delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;