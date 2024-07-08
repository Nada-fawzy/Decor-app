import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';


export const cartContext = createContext()
const baseURL = "http://localhost:3000/"

function CartContextProvider({children}) {
    const [cart , setCart] = useState()

    const getCart = () =>{
        axios.get(`${baseURL}orders/?_expand=product`)
        .then((res)=>{
            console.log( "ON CART CONTEXT: ", res.data);
            setCart(()=> res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }
    useEffect(()=>{
        getCart()
    } , [])

    const removeFromCart = (id) =>{
        axios.delete(`${baseURL}orders/${id}`)
        .then((res) =>{
            console.log("deleted : " , res.data);
            getCart()
        })
        .catch((err) => {
            console.log("Error : " , err);
        })
    }

    const decrement = (product) => {
        if(product.Quantity > 1){
            product.Quantity -= 1;
            axios.put(`${baseURL}orders/${product.id}` , product)
            .then((res) =>{
                console.log("Updated : " , res.data);
                getCart()
            })
            .catch((err) => {
                console.log("Error : " , err);
            })
        }
    }
    const increment = (product) => {
            product.Quantity += 1;
            axios.put(`${baseURL}orders/${product.id}` , product)
            .then((res) =>{
                console.log("Updated : " , res.data);
                getCart()
            })
            .catch((err) => {
                console.log("Error : " , err);
            })
    }
    return (
        <cartContext.Provider value={{getCart , cart , removeFromCart , decrement , increment}}>
            {children}
        </cartContext.Provider>
    );
}

export default CartContextProvider;