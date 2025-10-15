import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {navigate} =useContext(ShopContext);
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 sm:pt-5 sm: pt-14 min-h-[80vh] border-t'>
      {/* ------Left-Side------ */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px] '>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />

        </div>
        <div className=' flex gap-3  '>
          <input type='text' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' name="" id="" placeholder="First Name" required/>
          <input type='text' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' name="" id="" placeholder="Last Name" />
        </div>
        <input type='email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' name="" id="" placeholder="Email Address" />
        <input type='number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' name="" id="" placeholder="Phone" />
        <div className=' flex gap-3  '>
          <input type='number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' name="" id="" placeholder="Zipcode" />
          <input type='text' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' name="" id="" placeholder="Country" />
        </div>
        <div className=' flex gap-3  '>
          <input type='text' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' name="" id="" placeholder="City " />
          <input type='text' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' name="" id="" placeholder="State" />
        </div>
        <input type='text' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' name="" id="" placeholder="Street" />


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
          <button onClick={()=>navigate('/orders')} className='bg-black cursor-pointer text-white px-16 py-3 text-sm active:bg-gray-600'>PLACE ORDER</button>
      </div>
        </div>

    </div>
  )
}

export default PlaceOrder