import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Add = () => {
  const [image1,setImage1]=useState(false)
  const [image2,setImage2]=useState(false)
  const [image3,setImage3]=useState(false)
  const [image4,setImage4]=useState(false)

  const[name,setName]=useState("")
  const[description,setDescription]=useState("")
  const[price,setPrice]=useState("")
  const[category,setCategory]=useState("Men")
  const[subCategory,setSubCategory]=useState("Topwear")
  const[bestseller,setBestseller]=useState(false)
  const[sizes,setSizes]=useState([])
  return (
    <form>
      <div>
        <p className='text-3xl py-4'>Upload Image</p>
        <div className='flex gap-8'>
          <label htmlFor="image1" >
            <img src={!image1?assets.upload_area:URL.createObjectURL(image1)} alt='' className='w-20 h-20 ' />
            <input onChange={(e)=>{setImage1(e.target.files[0]) }}  type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2" >
            <img src={!image2?assets.upload_area:URL.createObjectURL(image2)} alt='' className='w-20 h-20 ' />
            <input onChange={(e)=>{setImage2(e.target.files[0]) }}  type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3" >
            <img src={!image3?assets.upload_area:URL.createObjectURL(image3)} alt='' className='w-20 h-20' />
            <input  onChange={(e)=>{setImage3(e.target.files[0]) }} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4" >
            <img src={!image4?assets.upload_area:URL.createObjectURL(image4)} alt='' className='w-20 h-20' />
            <input onChange={(e)=>{setImage4(e.target.files[0]) }}  type="file" id="image4" hidden />
          </label>

        </div>
      </div>
      <div className='w-full '>
        <p className='mb-2'>Product Name</p>
        <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder='Type Here' className='w-full max-w-[500px] px-3 py-2 'required />
       
         </div>
      <div className='w-full '>
        <p className='mb-2'>Product Description</p>
        <input type="text" onChange={(e)=>{setDescription(e.target.value)}} value={description} placeholder='Write Content Here' className='w-full max-w-[500px] px-3 py-2 ' />
      </div>

      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <p className="mb-2" >Product Category</p>
          <select onChange={(e)=>{setCategory(e.target.value)}} value={category} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value=" Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2" >Sub Category</p>
          <select onChange={(e)=>{setSubCategory(e.target.value)}} value={subCategory} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value=" Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2" >Product Price</p>
          
          <input onChange={(e)=>{setPrice(e.target.value)}} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='250' />
        </div>
      </div>
        <p className='mb-2'>Product Sizes</p>
      <div className='flex gap-3'>
        <div className='bg-slate-200 px-3 py-1 cursor-pointer'>
          <p>S</p>
        </div>
        <div className='bg-slate-200 px-3 py-1 cursor-pointer'>
          <p>M</p>
        </div>
        <div className='bg-slate-200 px-3 py-1 cursor-pointer'>
          <p>L</p>
        </div>
        <div className='bg-slate-200 px-3 py-1 cursor-pointer'>
          <p>XL</p>
        </div>
        <div className='bg-slate-200 px-3 py-1 cursor-pointer'>
          <p>XXL</p>
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input onChange={(e)=>{setBestseller(e.target.value)}} value={bestseller} type='checkbox' id='bestseller'/>
        <label htmlFor='bestseller' className='cursor-pointer'>Add to bestseller</label>
      </div>
      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add