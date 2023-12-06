
import './App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'

import LayOut from './components/LayOut/LayOut';

import Carts from './components/Carts/Carts';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Products from './components/Products/Products';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';

const Router = createBrowserRouter([
  {path:'',element:<LayOut/>,children:[
    {path:'home',element:<Home/>},
    {path:'Carts',element:<Carts/>},
    {path:'Login',element:<Login/>},
    {path:'Register',element:<Register/>},
    {path:'Products',element:<Products/>},
    {path:'*',element:<NotFound/>}
  ]}
])
function App() {
  return (
   <>
   <RouterProvider router={Router}/>
   </>
  );
}

export default App;
