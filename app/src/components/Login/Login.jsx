import React, { useState } from 'react'
import {Formik, useFormik} from 'formik'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

export default function Login({saveuserdata}) {
  const[errors,seterrMessage] = useState('')
  const[loading,setloading] = useState(false)
  let navigate = useNavigate()
 async function sendData(values){
    setloading(true)
    let {data} =await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values).catch((err)=>{
       setloading(false)
   seterrMessage(err.response.data.message)
  console.log(err)
    })
    console.log(data)
    if(data.message ==='success'){
      localStorage.setItem('userToken',data.token)
      saveuserdata()
      setloading(false)
      navigate('/Home')
    }
  }

  function validate(values){
    const errors = {}
  
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
    return errors;
  }


  let Formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validate,
    onSubmit:(values)=>sendData(values)
  })
  return (

    <div className='container my-5 py-5'>
    <h2 className='text-center my-3'>Login</h2>
    {errors.length >0 ? <div className='alert alert-danger'>{errors}</div> : null}
    <form onSubmit={Formik.handleSubmit}>
      <label htmlFor='email'>email:</label> 
      <input onBlur={Formik.handleBlur}  onChange={Formik.handleChange} type='email' value={Formik.values.email} name='email' id='email' className='form-control my-2' />
      {Formik.errors.email && Formik.touched.email ?<div className='alert alert-danger'>{Formik.errors.email}</div> : null }
      <label  htmlFor='password'>password:</label>
      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} type='password' value={Formik.values.password} name='password' id='password' className='form-control my-2'/>
      {Formik.errors.password && Formik.touched.password ?<div className='alert alert-danger'>{Formik.errors.password}</div> : null }
      <Link to='/forget-password' className='text-main'>Forget you password...?</Link>
      <br/>
      {loading ? <button className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:<button className='btn bg-main text-white my-2' type='submit'>Submit</button>}
      
    </form>
   </div>
  )
}
