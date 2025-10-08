import React from 'react'
import { assets } from '../assets/assets.js'

const Navbar = () => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img src={ assets.logo } className='w-[max(10%,80px)] h-10 rounded-3xl' alt=""/>
        <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full cursor-pointer'>Logout</button>

    </div>
  )
}

export default Navbar