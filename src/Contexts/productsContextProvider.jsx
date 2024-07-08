import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const productsContext = createContext()
const baseURL = "http://localhost:3000/"

function ProductsContextProvider({children}) {
    const [products , setProducts] = useState([])
    const [product , setProduct] = useState()
    const [comments , setComments] = useState()
    const navigate = useNavigate()
    const getProducts = () =>{
        axios.get('http://localhost:3000/products')
        .then((res)=>{
            console.log(res.data);
            setProducts(()=> res.data)
        })
    }
    useEffect(()=>{
        getProducts()
        console.log(products);
    } , []) 

    const getProduct = (id )=>{
        axios.get(`${baseURL}products/${id}?_embed=comments&_expand=category`)
        .then((res)=>{
            console.log("Get Product Success :", res.data);
            setProduct(()=>res.data)
            navigate(`products/${id}`)
            // window.location.href = `product/${id}`
        })
        .catch((err)=>{
            console.log("Get Product Err",err);
        })
    }

    const addToFav = (id) =>{
        axios.post(`${baseURL}favourites/` , {productId : id , userId : "1"})
        .then((res)=>{
            console.log(res);
            Swal.fire({
                title: "Added To favourites",
                icon: "success"
              });            
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const addToCart = (id) =>{
        axios.post(`${baseURL}orders/` , {Quantity: 1 , productId : id , userId : "1"})
        .then((res)=>{
            console.log("Added To cart",res);     
            Swal.fire({
                title: "Added To Cart",
                icon: "success"
              });       
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const deleteComment = (id , prodId) =>{
        axios.delete(`http://localhost:3000/comments/${id}`)
        .then((res)=>{
            console.log(res);  
            getProduct(prodId)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const addComment = (comment , uId , prodId) =>{
        axios.post(`http://localhost:3000/comments/` ,
            {
                text : comment,
                userId : uId,
                productId : prodId
            }
         )
        .then((res)=>{
            console.log(res);  
            getProduct(prodId)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <productsContext.Provider value={{products , getProduct , product , addToFav , addToCart , deleteComment , addComment}}>
            {children}
        </productsContext.Provider>
    );
}

export default ProductsContextProvider;
