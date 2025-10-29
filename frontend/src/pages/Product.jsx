import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts.jsx'

const Product = () => {
  const { productId } = useParams()
  const { products, currency ,addToCart } = useContext(ShopContext)
  const [productsData, setProductsData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const fetchProductsData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductsData(item)
        // console.log(item)
        setImage(item.image[0])
        return null;
      }


    })

  }

  useEffect(() => {
    fetchProductsData()

  }, [productId, products])

  return productsData ? (
    <div className=' pt-2 transition-opacity ease-in duration-500 opacity-100  '>
      {/* Products Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Products Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productsData.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt='' />

          </div>
        </div>

        {/* ----Product Info----- */}
        <div className='flex-1'>
          <h1 className='font-medium mt-2'>{productsData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3.5' src={assets.star_icon} alt='' />
            <img className='w-3.5' src={assets.star_icon} alt='' />
            <img className='w-3.5' src={assets.star_icon} alt='' />
            <img className='w-3.5' src={assets.star_icon} alt='' />
            <img className='w-3.5' src={assets.star_dull_icon} alt='' />
            <p className='pl-2'>(12)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productsData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5 '>{productsData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p> Select Size</p>
            <div className='flex gap-2 '>

              {productsData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`bg-amber-400  h-8 w-12 ${item === size ? 'border-2 border-amber-600' : ''}`} key={index} > {item} </button>
              ))}
            </div>
          </div>
          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 ' onClick={()=>addToCart(productsData._id,size)} >ADD TO CART</button>
        <hr className='mt-8 sm:w-4/5 '/>
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>100% Original Product</p>
                <p>Cash on delivery is available</p>
                <p>Easy Return and Exchange Policy within 3 days</p>
        </div>
        </div>
      </div>
      {/* REVIEW AND DESCRIPTION */}
      <div className='mt-20 '>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>

        </div>
        <div className='flex flex-col gap-4 border px-6 text-sm text-gray-500'>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque deleniti officia illum provident neque sapiente, laboriosam ex adipisci aperiam quisquam maiores officiis quaerat incidunt dignissimos quae minus nam dolorem possimus voluptas. Debitis, tempore architecto, iste consectetur corrupti ut asperiores, repellendus laboriosam aliquid autem iure nam! Corrupti, omnis eos accusamus commodi molestias quod totam quo repudiandae veritatis aspernatur debitis quisquam sapiente?</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, sapiente? Debitis suscipit facere impedit voluptates. Quo, eaque. Perferendis cupiditate, tempora obcaecati accusantium totam, soluta dolorem iste impedit aliquam maiores laboriosam alias numquam. Nemo, quis eveniet iusto aliquid illum eos vel!</p>
        </div>
      </div>
      {/* Display related products */}
      <RelatedProducts category={productsData.category} subCategory={productsData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product