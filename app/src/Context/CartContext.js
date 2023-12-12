import axios from "axios";
import { createContext } from "react";


export let CartContext = createContext();
export default function CartContextProvider(props){
    let userToken = localStorage.getItem('userToken')
    let headers = {Token:userToken}
    function addToCart(id){
       return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,{productId:id},{headers})
       .then((response)=>response)
       .catch((err)=>err)
    }
    function getloggedCart(){
        return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,{headers})
        .then((response)=>response)
        .catch((err)=>err)
     }
     function updateonCart(id,count){
        return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{count:count},{headers})
        .then((response)=>response)
        .catch((err)=>err)
     }
     function deleteonCart(id){
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{headers})
        .then((response)=>response)
        .catch((err)=>err)
     }
     
    return <CartContext.Provider value={{addToCart , getloggedCart , updateonCart , deleteonCart}}>
            {props.children}
    </CartContext.Provider>
}