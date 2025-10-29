import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {
  const { backend_url,token, currency } = useContext(ShopContext)
  const [orderData,setorderData]=useState([])
  const loadOrderData = async () =>{
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backend_url+'/api/order/userorders',{},{headers:{token}})
      // console.log(response.data,"now")
      if (response.data.success) {
        let allOrdersItem=[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            
            item['status']=order.status
            item['payment'] = order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
    } catch (error) {
      
    }
  }
  
  useEffect(()=>{
    loadOrderData()
    // setorderData(response.data)
},[token])

  return (
    <div>
      <div className='text-2xl '>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 '>
              <div className='flex items-start gap-6 text-sm'>

                <img className='w-16 sm:w-20  ' src={item.image[0]} />
                <div>
                  <p className='sm:text-base font-medium '>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-500'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size:{item.size}</p>

                  </div>
                  <p className='mt-1'>Date:<span className='text-gray-400 pl-2'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment:<span className='text-gray-400 pl-2 '>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between '>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500 '></p>
                  <p className='text-sm md:text-base'>{item.status}</p>

                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm border-gray-400 active:bg-amber-300  '>Track Order</button>

              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders