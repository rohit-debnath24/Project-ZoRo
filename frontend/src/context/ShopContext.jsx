import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'
export const ShopContext= createContext();


const ShopContextProvider = (props) => {
    const currency='₹';  
    const delivery_fee=10;
    const backend_url=import.meta.env.VITE_BACKEND_URL;
    console.log('1. VITE_BACKEND_URL from .env:', backend_url);
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(true)
    const [cartItems,setCartItems]=useState({})
    const[products,setProducts]=useState([])
    const navigate =useNavigate();
    const[token,setToken]=useState('')


    const addToCart = async(itemId,size)=>{

            if(!size){
                toast.error('Select Product Size');
                return;
            }else{
                 toast.success('Product Added to Cart');
            }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size]+=1;
        }else{
            cartData[itemId][size]=1;
        }
            
        }else{
            cartData[itemId] = {}
            cartData[itemId][size]=1;
        }

        setCartItems(cartData)
        if (token) {
            try {
                await axios.post(backend_url+'/api/cart/add',{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () =>{
        let totalCount =0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                    
                } catch (error) {
                }
            }
        }
        return totalCount;
    }
    
    const getProductData=async()=>{
        try {
                const response =await axios.post(backend_url+'/api/product/list')
                // setProducts(response.data.data);
                if(response.data.success){
                    setProducts(response.data.products)
                     console.log(response.data.products,'coming after seting the prod ')
                }else{
                    // console.log('false')
                    toast.error(response.data.message)
                    
                }
                // console.log(response.data.products)
                // console.log('below \n',response.data,'hii')
            } catch (error) {
                console.log(error)
                toast.error(error.message)
                
            }
    }
    
    useEffect(()=>{
        getProductData()
    },[])

     useEffect(()=>{
      if(!token&& localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        
      }
    },[])




    const updateQuantity = async(itemId,size,quantity) => {
        let  cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>(product._id === items ));
            for(const item in cartItems[items]){
                try {
                    if( cartItems[items][item]>0 ){
                     totalAmount+=itemInfo.price*cartItems[items][item]   
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount; 
    }



    const value = {
        products , currency , delivery_fee , 
        search,setSearch,showSearch, setShowSearch,
        cartItems,setCartItems,addToCart,getCartCount,updateQuantity,
        getCartAmount,navigate,backend_url,
        setToken,token
    
    }

    

        
    
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;