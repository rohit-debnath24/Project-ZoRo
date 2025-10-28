import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import {  useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backend_url, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({ ...data, [name]: value }))

  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      console.log(orderItems,"coming from order placed")
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
        
      }
      // console.log(response.data,"coming after order placed")
      switch (method) {
        //api calls for COD
        case 'cod':
          const response =await axios.post(backend_url+'/api/order/place',orderData,{headers:{token}})
          
        console.log(response.data,"this is response data")
        
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
            toast.success(response)
          }else{
            toast.error(response.data.message)
          }
          break;


          default:
          break;
      }

    } catch (error) {

    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 sm:pt-5 sm: pt-14 min-h-[80vh] border-t'>
      {/* ------Left-Side------ */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px] '>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />

        </div>
        <div className=' flex gap-3  '>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type='text' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' id="" placeholder="First Name" />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type='text' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' id="" placeholder="Last Name" />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type='email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' id="" placeholder="Email Address" />
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type='number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' id="" placeholder="Phone" />
        <div className=' flex gap-3  '>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type='number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' id="" placeholder="Zipcode" />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type='text' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' id="" placeholder="Country" />
        </div>
        <div className=' flex gap-3  '>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type='text' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' id="" placeholder="City " />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type='text' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' id="" placeholder="State" />
        </div>
        <input required onChange={onChangeHandler} name='street' value={formData.street} type='text' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' id="" placeholder="Street" />


      </div>
      {/* ----------RIGHT-SIDE--------- */}
      <div className='flex-row'>

        <div className='mt-8 min-w-80'>
          <CartTotal />

        </div>
        <div className='mt-12 '>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>
              <p onClick={() => setMethod('stripe')} className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}  `}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt='' />

            </div>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>
              <p onClick={() => setMethod('razor')} className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razor' ? 'bg-green-400' : ''}  `}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt='' />

            </div>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>
              <p onClick={() => setMethod('cod')} className={`min-w-3.5 h-3.5 border rounded-full  ${method === 'cod' ? 'bg-green-400' : ''}  `}></p>
              <p className='text-gray-500 text-sm font-medium mx-4 '> CASH ON DELIVERY</p>

            </div>
          </div>

        </div>
        <div className='w-full text-end mt-8 '>
          <button type='submit' className='bg-black cursor-pointer text-white px-16 py-3 text-sm active:bg-gray-600'>PLACE ORDER</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder