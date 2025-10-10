import React, { useEffect, useState } from 'react'
import { backend_Url } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = () => {
  const [list,setList]=useState([])

  const fetchList = async()=>{
      try {
        const response=await axios.post(backend_Url +"/api/product/list")
       if(response.data.success){

         setList(response.data.products)
        }else{
          toast.error(response.data.message)

        }
      } catch (error) {
         console.log(error)
              toast.error(error.message)
      }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div>
          <div>
            <b></b>
          </div>
      </div>
    </>
  )
}

export default List