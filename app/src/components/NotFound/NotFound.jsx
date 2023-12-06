import React from 'react'
import images from '../../assets/images/notfound.png'
export default function NotFound() {
  return (
    <div className='text-center p-5'>
      <img src={images} className='w-75' alt='not found image'/>
    </div>
  )
}
