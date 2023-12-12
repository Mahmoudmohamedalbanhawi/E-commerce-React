import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'


export default function Carts() {
  const [cartproduct,setcartproduct] = useState(null)

  const[totalPrice , setAllprice] = useState()
  let {getloggedCart,updateonCart , deleteonCart} = useContext(CartContext)
  async function addCart(){
    let response =await getloggedCart();
    setcartproduct(response.data.data)
    setAllprice(response.data.data.totalCartPrice)
    console.log(cartproduct)
  }
 async function updatecount(id,count){
    let res=await updateonCart(id,count)
    setcartproduct(res.data.data)

  }
  async function deletcount(id){
    let res=await deleteonCart(id)
    setcartproduct(res.data.data)

  } 

  


  useEffect(()=>{
    addCart()
  },[])

  return (
   <div className="container bg-main-light p-4 my-4">
    <h5 className='fw-bolder text-main'>Shop Cart</h5>
   <h6>Total Price : <span>{totalPrice}</span></h6>
    {cartproduct !== null ? cartproduct.products.map((prod , index)=>{
      return <div className="row" key={index}>
        <div className="col-md-2 my-3">
          <img src={prod.product.imageCover} className='w-100' alt='image prod'/>
        </div>
        <div className="col-md-10 my-3">
          <div className="box d-flex justify-content-between align-items-center">
            <div className="item">
            <h6 className='my-3'>title: {prod.product.title}</h6>
          <h6 className='my-3'>price :{prod.price}</h6>
          <button className='btn btn-outline-danger' onClick={()=>{deletcount(prod.product._id)}}><i className='fa-solid fa-trash mx-2 bg-danger'></i>remove</button>
              </div>  
              <div className="item">
                <button className='btn border-main px-2 ' onClick={()=>{updatecount(prod.product._id , prod.count+1)}}>+</button>
                <span className='mx-2'>{prod.count}</span>
                <button className='btn border-main px-2'  onClick={()=>{updatecount(prod.product._id , prod.count-1)}}>-</button>
              </div>
          </div>
          
        </div>
      </div>
    }) : null}
   </div>
  )
}
