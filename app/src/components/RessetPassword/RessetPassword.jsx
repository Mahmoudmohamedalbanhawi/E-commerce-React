import React, { useState } from 'react'
import {Formik, useFormik} from 'formik'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
export default function RessetPassword() {
  const[errors,seterrMessage] = useState('')
  const[loading,setloading] = useState(false)
  let navigate = useNavigate()
 async function sendData(values){
    setloading(true)
    let {data} =await axios.put('https://route-ecommerce.onrender.com/api/v1/auth/resetPassword',values).catch((err)=>{
       setloading(false)
   seterrMessage(err.response.data.message)
  console.log(err)
    })
    console.log(data)
    if(data.token){
      setloading(false)
      navigate('/login')
    }
  }

  function validate(values){
    const errors = {}
  
    if(!values.email){
      errors.email = 'email is required'
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
      errors.email = 'invalid email address'
    }
    if(!values.newPassword){
      errors.newPassword = 'newPassword is required'
    }else if(!/^[A-Z][@a-z0-9]{2,}$/i.test(values.newPassword)){
      errors.newPassword = 'invalid newPassword'
    }
    return errors;
  }


  let Formik = useFormik({
    initialValues:{
      email:'',
      newPassword:'',
    },
    validate,
    onSubmit:(values)=>sendData(values)
  })
  return (
    <div className='container my-5 py-5'>
    <h2 className='text-center my-3'>Resset Paaword</h2>
    {errors.length >0 ? <div className='alert alert-danger'>{errors}</div> : null}
    <form onSubmit={Formik.handleSubmit}>
      <label htmlFor='email'>email:</label> 
      <input onBlur={Formik.handleBlur}  onChange={Formik.handleChange} type='email' value={Formik.values.email} name='email' id='email' className='form-control my-2' />
      {Formik.errors.email && Formik.touched.email ?<div className='alert alert-danger'>{Formik.errors.email}</div> : null }
      <label  htmlFor='newPassword'>newPassword:</label>
      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} type='password' value={Formik.values.newPassword} name='newPassword' id='newPassword' className='form-control my-2'/>
      {Formik.errors.newPassword && Formik.touched.newPassword ?<div className='alert alert-danger'>{Formik.errors.newPassword}</div> : null }
      <br/>
      {loading ? <button className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:<button className='btn bg-main text-white my-2' type='submit'>Submit</button>}
      
    </form>
   </div>
  )
}
