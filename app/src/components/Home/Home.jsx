import React from 'react'
import Header from '../Header/Header'
import Categories from '../Categories/Categories'
import Products from '../Products/Products'

export default function Home() {
  return (
    <>
    <Header/>
    <h3 className='text-center my-3 pb-3'>Popular Categories</h3>
    <div className="container my-2">
    <Categories/>
    </div>
    <h3 className='text-center py-3 my-3'>Popular Products</h3>
    <div className="container my-3">
    <Products/>
    </div>
    </>
  )
}
