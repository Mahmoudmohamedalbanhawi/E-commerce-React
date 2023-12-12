import React from 'react'
import banner from '../../assets/images/grocery-banner.png';
export default function Header() {
  return (
    <div className='vh-100'>
        <img src={banner} className='w-100 ' />
    </div>
  )
}
