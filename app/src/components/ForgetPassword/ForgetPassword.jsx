import React, { useState } from 'react'
import {Formik, useFormik} from 'formik'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function ForgetPassword() {
  let navigate = useNavigate()
  const[loading,setloading] = useState(false)
  const[disable,isdisable] = useState(false)

  const[err,seterrMessage] = useState('')
 async function forgetpassword(values){
    setloading(true)
    let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,values)
    if(data.statusMsg === "success"){
      isdisable(true)
      setloading(false)
    }
  }


 

  function validate(values){
    const errors = {}
  
    if(!values.email){
      errors.email = 'email is required'
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
      errors.email = 'invalid email address'
    }
    return errors;
  }

       async function verifycode(values){
    setloading(true)
    let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,values).catch((err)=>{
      setloading(false)
      seterrMessage(err.response.data.message)
    })
   if(data.status === 'Success'){
    setloading(false)
    navigate('/reset-password')
   }
  }

  let Formik = useFormik({
    initialValues:{
      email:'',
    },
    validate,
    onSubmit:(values)=>
    {
     forgetpassword(values)
    }
  })
  let Formik1 = useFormik({
    initialValues:{
      resetCode:'',
    },
    onSubmit:(values)=>
    {
     verifycode(values)
    }
  })

  return (
    <div className='container my-5 py-5'>
    <h2 className='text-center my-3'>ForgetPassword</h2>
    {err !='' ? <div className='alert alert-danger'>{err}</div> : null}
    {disable ? <form onSubmit={Formik1.handleSubmit}>
      <label htmlFor='resetCode'>resetCode:</label> 
      <input onBlur={Formik1.handleBlur}  onChange={Formik1.handleChange} type='text' value={Formik1.values.resetCode} name='resetCode' id='resetCode' className='form-control my-2' />
      {Formik1.errors.resetCode && Formik1.touched.resetCode ?<div className='alert alert-danger'>{Formik1.errors.resetCode}</div> : null }
      {Formik1.errors.resetCode && Formik1.touched.resetCode ?<div className='alert alert-danger'>{Formik1.errors.resetCode}</div> : null }
      {loading ? <button className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:<button className='btn bg-main text-white my-2' type='submit'>Submit</button>}
      
    </form>: <form onSubmit={Formik.handleSubmit}>
      <label htmlFor='email'>email:</label> 
      <input onBlur={Formik.handleBlur}  onChange={Formik.handleChange} type='email' value={Formik.values.email} name='email' id='email' className='form-control my-2' />
      {Formik.errors.email && Formik.touched.email ?<div className='alert alert-danger'>{Formik.errors.email}</div> : null }
      {Formik.errors.password && Formik.touched.password ?<div className='alert alert-danger'>{Formik.errors.password}</div> : null }
      {loading ? <button className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:<button className='btn bg-main text-white my-2' type='submit'>Submit</button>}
      
    </form>}
    
   
   </div>
  )
}
