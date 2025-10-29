import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { backend_Url, currency } from '../App.jsx'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets.js'
const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backend_Url + '/api/order/list', {}, { headers: { token } })
      console.log(response.data, 'from admin')
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }



  }
  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3>Order Page </h3>
      <div>
        {
          orders.map((order, index) => (
            <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-gray-400 p-5 md:my-4 text-xs sm:text-sm text-gray-700 '>
              <div>

                <img src={assets.parcel_icon} alt="" />

                <div>
                  <div>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return <p key={index}>{item.name} x {item.quantity}<span>{item.size}</span>  </p>
                      } else {

                        return <p key={index}>{item.name} x {item.quantity}<span>{item.size}</span>,  </p>
                      }

                    })}



                  </div>
                  <p>{order.address.firstName + " " + order.address.lastName}</p>
                  <div>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>

                  </div>
                  <p>{order.address.phone}</p>
                </div>
              </div>
              <div>
                <p>Items : {order.items.length}</p>
                <p>Method : {order.paymentMethod}</p>
                <p>payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p>{currency}{order.amount}</p>
              <select >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out of delivery">Out of delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders