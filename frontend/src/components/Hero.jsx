import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Left side - text */}
      <div className='w-full sm:w-1/2 flex flex-col items-center justify-center text-[#414141] py-10 sm:py-0'>
        <div className='flex items-center gap-2 mb-2'>
          <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          <p className='font-medium text-sm md:text-base'>OUR BESTSELLER</p>
        </div>

        <h1 className='text-3xl prata-regular sm:py-3 lg:text-5xl leading-relaxed text-center'>
          Latest Arrivals
        </h1>

        <div className='flex items-center gap-2 mt-2'>
          <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
          <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
        </div>
      </div>

      {/* Right side - image */}
      <img
        src={assets.logo}
        className='w-full sm:w-1/2 object-cover'
        alt='Hero'
      />
    </div>
  )
}

export default Hero
