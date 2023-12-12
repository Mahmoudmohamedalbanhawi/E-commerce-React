import React, { useState } from 'react'
import {Formik, useFormik} from 'formik'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Register() {
  const[errors,seterrMessage] = useState('')
  const[loading,setloading] = useState(false)
  let navigate = useNavigate()
 async function sendData(values){
    setloading(true)
    let {data} =await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',values).catch((err)=>{
       setloading(false)
   seterrMessage(err.response.data.message)
  console.log(err)
    })
    console.log(data)
    if(data.message ==='success'){
      setloading(false)
      navigate('/login')
    }
  }

  function validate(values){
    const errors = {}
    if(!values.name){
      errors.name = 'name is required'
    }else if(values.name.length <3){
      errors.name = 'name min length is 3'
    }
    if(!values.email){
      errors.email = 'email is required'
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
      errors.email = 'invalid email address'
    }
    if(!values.password){
      errors.password = 'password is required'
    }else if(!/^[A-Z][@a-z0-9]{2,}$/i.test(values.password)){
      errors.password = 'invalid password'
    }
    if(!values.rePassword){
      errors.rePassowrd = 'repassword is required'
    }else if(values.rePassword !== values.password){
      errors.rePassword = 'invalid repassword'
    }
    if(!values.phone){
      errors.phone = 'phone is required'
    }else if(!/^01[1025][0-9]{8}$/i.test(values.phone)){
      errors.phone= 'invalid phone'
    }
    return errors;
  }


  let Formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },
    validate,
    onSubmit:(values)=>sendData(values)
  })
  return (
   <div className='container my-5 py-5'>
    <h2 className='text-center my-3'>Registration</h2>
    {errors.length >0 ? <div className='alert alert-danger'>{errors}</div> : null}
    <form onSubmit={Formik.handleSubmit}>
      <label htmlFor='name'>name:</label>
      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} type='text' name='name' value={Formik.values.name} className='form-control my-2' id='name'/>
      {Formik.errors.name &&Formik.touched.name ?<div className='alert alert-danger'>{Formik.errors.name}</div> : null }
      <label htmlFor='email'>email:</label> 
      <input onBlur={Formik.handleBlur}  onChange={Formik.handleChange} type='email' value={Formik.values.email} name='email' id='email' className='form-control my-2' />
      {Formik.errors.email && Formik.touched.email ?<div className='alert alert-danger'>{Formik.errors.email}</div> : null }
      <label  htmlFor='password'>password:</label>
      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} type='password' value={Formik.values.password} name='password' id='password' className='form-control my-2'/>
      {Formik.errors.password && Formik.touched.password ?<div className='alert alert-danger'>{Formik.errors.password}</div> : null }
      <label htmlFor="rePassword">rePassword</label>
      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} type='password' value={Formik.values.rePassowrd} name='rePassword' id='rePassword' className='form-control my-2'/>
      {Formik.errors.rePassword && Formik.touched.rePassword ?<div className='alert alert-danger'>{Formik.errors.rePassword}</div> : null }
      <label htmlFor="phone">phone</label>
      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} type='phone' value={Formik.values.phone} name='phone' id='phone' className='form-control my-2'/>
      {Formik.errors.phone && Formik.touched.phone ?<div className='alert alert-danger'>{Formik.errors.phone}</div> : null }
      {loading ? <button className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:<button className='btn bg-main text-white my-2' type='submit'>Submit</button>}
      
    </form>
   </div>
  )
}
