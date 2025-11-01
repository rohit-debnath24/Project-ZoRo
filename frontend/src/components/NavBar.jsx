import React, {useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
const NavBar = () => {
    const [visible, setVisible] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const logout = () => {
        navigate('/login')
        setToken('')
        localStorage.removeItem('token')
        setCartItems({})

    }

    return (
        <div className='flex items-center justify-between py-5 font medium '>
            <Link to="/">

                <img src={assets.logo} className='w-36' alt="" />
            </Link>
            <ul className='hidden sm:flex gap-5 text-xl text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p className='cursor-pointer hover:text-black' >HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p className='cursor-pointer hover:text-black' >COLLECTIONS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p className='cursor-pointer hover:text-black' >ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p className='cursor-pointer hover:text-black' >CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>


            </ul>
            <div className='flex items-center gap-6'>
                <NavLink to='/collection'>    <img src={assets.search_icon} onClick={() => { setShowSearch(true) }} className='w-5 cursor-pointer' alt='' /></NavLink>
                <div className='group relative'>

                    {/* 1. This onClick is updated:
           - If token exists, it toggles the menu.
           - If not, it navigates to login.
    */}
                    <img
                        onClick={() => token ? setIsMenuOpen(prev => !prev) : navigate('login')}
                        src={assets.profile_icon}
                        alt=''
                        className='w-5 cursor-pointer'
                    />

                    {token &&
                        /* 2. This className is updated:
                               - We removed 'group-hover:block'.
                               - We use the 'isMenuOpen' state to conditionally add 'block' or 'hidden'.
                        */
                        <div className={`${isMenuOpen ? 'block' : 'hidden'} absolute dropdown-menu right-0 pt-4`}>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                {/* Added onClick to close menu after selection */}
                                <p onClick={() => { setIsMenuOpen(false); /* Your logic here */ }} className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => { setIsMenuOpen(false); navigate('/orders'); }} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={() => { setIsMenuOpen(false); logout(); }} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt='' />
                    <p className='absolute right-[-5px] w-4 text-center leading-4 bg-black aspect-square rounded-full text-[8px] text-white bottom-[-5px]'>
                        {getCartCount()}
                    </p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 sm:hidden cursor-pointer' alt='' />
            </div>
            {/* sidebar menu for small screen */}
            <div className={`absolute top-0 bottom-0 overflow-hidden bg-amber-100 transition-all ${visible ? 'w-full' : 'w-0'} `}>
                <div className='flex flex-col text-gray-600'>
                    <div className='flex items-center gap-4 p-3 '>
                        <img onClick={() => setVisible(false)} src={assets.dropdown_icon} className='h-4 rotate-180 ease-in-out duration-300 cursor-pointer' alt="" />
                        <p onClick={() => setVisible(false)} className='cursor-pointer'>Back</p>

                    </div>
                    <NavLink className='py-2 pl-6 border' onClick={() => setVisible(false)} to='/'>HOME</NavLink>
                    <NavLink className='py-2 pl-6 border' onClick={() => setVisible(false)} to='/collection'>COLLECTIONS</NavLink>
                    <NavLink className='py-2 pl-6 border' onClick={() => setVisible(false)} to='/about'>ABOUT</NavLink>
                    <NavLink className='py-2 pl-6 border' onClick={() => setVisible(false)} to='/contact'>CONTACT</NavLink>

                </div>
            </div>
        </div>
    )
}

export default NavBar