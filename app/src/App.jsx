
import './App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'

import LayOut from './components/LayOut/LayOut';

import Carts from './components/Carts/Carts';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Products from './components/Products/Products';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import RessetPassword from './components/RessetPassword/RessetPassword';
import {jwtDecode} from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductsDetails from './components/ProductsDetails/ProductsDetails';
import CartContextProvider from './Context/CartContext';


function App() {
  const[userData,setuserData] = useState(null)

function saveuserdata(){
  let encode = localStorage.getItem('userToken')
  let decode = jwtDecode(encode)
  setuserData(decode)
  console.log(decode)  
}
useEffect(()=>{
  if(localStorage.getItem('userToken') !== null){
    saveuserdata()
  }
},[])

  const Router = createBrowserRouter([
    {path:'',element:<LayOut userData={userData} setuserData={setuserData}/>,children:[
      {path:"E-commerce-React", element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'Carts',element:<ProtectedRoute><Carts/></ProtectedRoute>},
      {path:'Products',element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'Products/:id',element:<ProtectedRoute><ProductsDetails/></ProtectedRoute>},
      {path:'Login',element:<Login saveuserdata={saveuserdata} />},
      {path:'Register',element:<Register/>},
      {path:'forget-password',element:<ForgetPassword/>},
      {path:'reset-password',element:<RessetPassword/>},
      {path:'*',element:<NotFound/>}
    ]}
  ])
  return (
   <>
   <CartContextProvider>
   <RouterProvider router={Router}/>
   </CartContextProvider>
   
   
   </>
  );
}

export default App;
