import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
export default function Categories() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };
  const[Categories , setcat] = useState([]);
  async function getallcat(){
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    setcat(data.data)
  }
  
  useEffect(()=>{
    getallcat()
  },[])
  return (
    <div className='row'>
       <Slider {...settings}>
        {Categories.map((cat , index)=>{
          return <div className="col-md-3" key={index}>
            <img src={cat.image} className='w-100 object-fit-cover' height={300} alt='cat image'/>
          </div>
        })}
       </Slider>
    </div>
  )
}
