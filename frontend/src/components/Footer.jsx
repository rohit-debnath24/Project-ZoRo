import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>

            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm  '>
                <div>
                    <img src={assets.logo} alt='' />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem laborum voluptate eaque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, consectetur! Eligendi tempora quia vero recusandae quibusdam reiciendis maiores tenetur impedit aliquam ullam architecto sint consequuntur ipsam in, qui ratione enim?</p>
                </div>
                <div  >
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>

                </div>
                <div  >
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Phone number-7029089847</li>
                        <li>Email-SujataDebnath@gmail.com</li>
                        <li>Instagram</li>

                    </ul>

                </div>
            </div>
            <div>
                <hr/>
                <p className='py-5 text-center text-sm'>All Copyrights Reserved @ Rohit Debnath</p>
            </div>
        </div>
    )
}

export default Footer