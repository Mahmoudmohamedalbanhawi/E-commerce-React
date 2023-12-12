import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { Toaster } from 'react-hot-toast';
export default function LayOut({userData,setuserData}) {
  let navigate = useNavigate()
  function logout(){
    localStorage.removeItem('userToken')
    setuserData(null)
    navigate('/login')
  }
  return (
   <>
   <NavBar logout={logout} userData={userData}/>
   <Outlet/>
   <Toaster/>
   <Footer/>
   </>
  )
}
