import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductsDetails() {
  const[prod,setprod] = useState({})
  let {id} = useParams()
  async function getspecificProduct(id){
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    console.log(data.data)
    setprod(data.data)
  }
  useEffect(()=>{
    getspecificProduct(id)
  },[])
  return (
    <>
    <div className="container my-5">
      <div className="row  d-flex align-items-center">
        <div className="col-md-4">
          <img src={prod.imageCover} className='w-100' alt='image product'/>
        </div>
        <div className="col-md-8">
          <p className='my-4'>{prod.title}</p>
          <p className='my-4'>{prod.description}</p>
          <div className="box d-flex justify-content-between">
            <span>{prod.ratingsAverage} <i className='fa-solid fa-star rating-color'></i></span>
            <span>{prod.price}EGP</span>
          </div>
          <button className='w-100 btn bg-main text-white my-3'>+ Add to Cart</button>
        </div>
      </div>
    </div>
    </>
  )
}
