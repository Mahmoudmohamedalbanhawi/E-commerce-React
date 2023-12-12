import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
export default function Products() {
  const [Allproducts , setallprod] = useState([])
  let {addToCart} = useContext(CartContext)
  async function getallproducts(){
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/`)
    setallprod(data.data)
  }
 async function addProduct(productId){
    let {data} = await addToCart(productId)
    console.log(data)
    if(data.status ==='success'){
      toast.success(data.message)
    }else {
      toast.error('error')
    }
  }
  useEffect(()=>{
    getallproducts()
  },[])


  return (
    <div className='row gy-5'>
       {Allproducts.map((prod , index)=>{
        return <div className="col-md-3" key={index}>
          <Link to={`/Products/${prod._id}`}>
          <img src={prod.imageCover} className='w-100' alt='prod image'/>
          <p className ='text-main'>{prod.title.split(" ").slice(0,3).join(" ")}</p>
          <div className="box d-flex justify-content-between">
            <span>{prod.ratingsAverage} <i className='fa-solid fa-star rating-color'></i></span>
            <span>{prod.price}EGP</span>
          </div>
          </Link>
          <button className='btn bg-main text-white w-100' onClick={()=>addProduct(prod._id)}>+ Add to Cart</button>
        </div>
       })}
    </div>
  )
}
