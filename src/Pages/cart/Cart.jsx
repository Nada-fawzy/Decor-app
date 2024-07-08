import React, { useContext, useEffect } from 'react';
import { cartContext } from '../../Contexts/cartContextProvider';
import styles from './cart.module.css'
import { productsContext } from '../../Contexts/productsContextProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



function Cart() {
    const { getCart , cart , removeFromCart , decrement , increment} = useContext(cartContext)
    const {getProduct} = useContext(productsContext)
    console.log("CART" , cart);
    const navigate = useNavigate()
    useEffect(()=>{
      getCart()
    } , [])

    if(!cart) {
        return (
          <div className="d-flex justify-content-center vh-100 align-items-center ">
            <div className="spinner-grow mx-1" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow mx-1" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow mx-1" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        );
      }
    return (
      <>
      {/* <h2 className='mt-3 w-25 mx-auto text-center rounded-3 py-2 ' style={{color:"rgb(53, 54, 54)"}}>Your Orders</h2> */}
    <div className="container d-flex p-5 px-2 m-auto my-5 rounded-3 justify-content-center flex-wrap cont">
      {cart.map((prod) => (
        <div key={prod.id} className="rounded-3 shadow h-auto mb-4 mx-2 d-flex flex-column justify-content-between" style={{ width: '18rem' }}>
          <div>
          <div
            className={`w-100 rounded-top-3 h-75 ${styles.img}`}
            style={{ backgroundImage: `url(${prod.product.paths.img})` }}
          ></div>
          <div className="p-3 ">
            <div className="d-flex justify-content-between align-items-start">
              <button className="bg-transparent border-0 text-start p-0" 
              onClick={() => getProduct(prod.id)}
              >
                <h4 className="m-0">{prod.product.name}</h4>
              </button>
              <button className="bg-transparent border-0" 
              onClick={() => removeFromCart(prod.id)}
              >
                <i className={`fas fa-trash p-2 ${styles.icon} text-danger m-0 rounded-5 border-0`}></i>
              </button>
              {/* <i className="fas fa-heart p-2 icon m-0 rounded-5 border-0"></i> */}
            </div>

            {[1, 2, 3, 4, 5].map((star, i) => (
              <i
                key={i}
                className={`${styles.icon} m-0 bg-transparent ${i < prod.product.rate ? 'fas fa-star' : 'far fa-star'}`}
              ></i>
            ))}

            <h5 className="mt-2 mb-1">{prod.product.price} EGP</h5>

            <div className="m-0 d-flex align-items-center">
              Quantity:
              <div className="d-flex justify-content-center align-items-center mx-2">
                <i 
                onClick={() => decrement(prod)} 
                className={`fas fa-caret-left ${styles.icon} m-0 p-0 pt-1 bg-transparent`}></i>
                <strong className="text-bold fs-5 m-0 p-0 mx-1">{prod.Quantity}</strong>
                <i 
                onClick={() => increment(prod)} 
                className={`fas fa-caret-right ${styles.icon} m-0 p-0 pt-1 bg-transparent`}></i>
              </div>
            </div>
          </div>
          </div>
          <div className="p-3  border-top d-flex flex-column justify-content-between align-items-center">
            <h6>Total Price: {+prod.product.price * +prod.Quantity} EGP</h6>
            <button className="btn btn-outline-dark mb-1 shadow w-50" style={{fontWeight:'600'}}
            onClick={()=>{
              navigate('/payment')
            }}
            >CHECKOUT</button>
          </div>
        </div>
      ))}
    </div>
    </>
    );
}

export default Cart;